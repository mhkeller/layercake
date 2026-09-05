<!--
	@component
	Generates a WebGL scatter plot.
 -->
<script>
	import reglWrapper from 'regl';
	import { getContext, onDestroy } from 'svelte';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=0] - The circle's stroke width in pixels.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 0 } = $props();

	// The shader wants the stroke as a share of the squared radius, not in pixels
	let strokeSize = $derived.by(() => {
		const inner = Math.max(0, 1 - strokeWidth / r);
		return 1 - inner * inner;
	});

	/**
	 * @param {string} hex
	 * @returns {number[]|undefined} - Returns an array of RGB values in the range [0, 1].
	 */
	function hexToRgbPercent(hex) {
		let str = hex.replace('#', '');
		if (str.length === 3) {
			str = str[0] + str[0] + str[1] + str[1] + str[2] + str[2];
		}
		return str.match(/.{1,2}/g)?.map(d => parseInt(d, 16) / 255);
	}

	const glCtx = getContext('gl');

	// The drawing buffer gets one pixel per device pixel, not per CSS pixel, so
	// the circles come out sharp on high-density screens
	let pixelRatio = $state(1);

	/**
	 * @param {WebGLRenderingContext} context
	 */
	function resize(context) {
		const canvas = /** @type {HTMLCanvasElement} */ (context.canvas);
		pixelRatio = window.devicePixelRatio || 1;
		const width = Math.round(canvas.clientWidth * pixelRatio);
		const height = Math.round(canvas.clientHeight * pixelRatio);

		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
		}
		context.viewport(0, 0, canvas.width, canvas.height);
	}

	/** @type {import('regl').Regl|undefined} */
	let regl;
	/** @type {import('regl').DrawCommand|undefined} */
	let drawPoints;

	/**
	 * Set up regl and compile the draw command once. Anything that changes
	 * between frames, like the points and colors, is passed to the draw command
	 * as props each time it runs.
	 * @param {WebGLRenderingContext} context
	 */
	function ensureRegl(context) {
		if (regl) return;

		regl = reglWrapper({
			gl: context,
			extensions: ['oes_standard_derivatives']
		});

		drawPoints = regl({
			// circle code comes from:
			// https://www.desultoryquest.com/blog/drawing-anti-aliased-circular-points-using-opengl-slash-webgl/
			frag: `
				#extension GL_OES_standard_derivatives : enable
				precision mediump float;
				uniform vec3 fill_color;
				uniform vec3 stroke_color;
				varying float s_s;
				void main () {

					vec2 cxy = 2.0 * gl_PointCoord - 1.0;

					float dist = dot(cxy, cxy);

					float delta = fwidth(dist);

					float alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, dist);

					float outer_edge_center = 1.0 - s_s;
					float stroke = 1.0 - smoothstep(outer_edge_center - delta, outer_edge_center + delta, dist);

					gl_FragColor = vec4( mix(stroke_color, fill_color, stroke), 1.0 ) * alpha;
					gl_FragColor.rgb *= gl_FragColor.a;
				}`,
			vert: `
				precision mediump float;
				attribute vec2 position;
				attribute float r;
				attribute float stroke_size;

				varying float s_s;

				uniform float stage_width;
				uniform float stage_height;

				// http://peterbeshai.com/beautifully-animate-points-with-webgl-and-regl.html
				vec2 normalizeCoords(vec2 position) {
					// read in the positions into x and y vars
					float x = position[0];
					float y = position[1];
					return vec2(
						2.0 * ((x / stage_width) - 0.5),
						// invert y to treat [0,0] as bottom left in pixel space
						-(2.0 * ((y / stage_height) - 0.5))
					);
				}

				void main () {
					s_s = stroke_size;
					gl_PointSize = r;
					gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
				}`,

			attributes: {
				// One [x, y] position for each point, in device pixels since that is what the buffer measures in
				/**
				 * @param {any} context
				 * @param {{ points: Array<any>, x: (d: any) => number, y: (d: any) => number, pointWidth: number, strokeSize: number, pixelRatio: number, fillColor?: number[], strokeColor?: number[] }} props
				 */
				position: (context, props) => {
					return props.points.map(point => {
						return [props.x(point) * props.pixelRatio, props.y(point) * props.pixelRatio];
					});
				},
				r: (context, props) => {
					// To size each circle from an r scale, use k.rGet(point) in place of pointWidth
					return props.points.map(() => props.pointWidth * props.pixelRatio);
				},
				stroke_size: (context, props) => {
					return props.points.map(() => props.strokeSize);
				}
			},
			uniforms: {
				fill_color: (context, props) => props.fillColor,
				stroke_color: (context, props) => props.strokeColor,
				// The canvas size, so the shaders can convert x / y pixel values to
				// WebGL coordinates. `regl.context` reads them off regl's own context.
				stage_width: regl.context('drawingBufferWidth'),
				stage_height: regl.context('drawingBufferHeight')
			},
			count: (context, props) => {
				// Draw one point per row
				return props.points.length;
			},
			primitive: 'points',
			blend: {
				enable: true,
				func: {
					srcRGB: 'src alpha',
					srcAlpha: 'src alpha',
					dstRGB: 'one minus src alpha',
					dstAlpha: 'one minus src alpha'
				}
			},
			depth: { enable: false }
		});
	}

	$effect(() => {
		if (!k.width || !k.height || !glCtx.gl) return;

		ensureRegl(glCtx.gl);
		if (!regl || !drawPoints) return;

		resize(glCtx.gl);
		// Let regl pick up the new drawing buffer size
		regl.poll();

		regl.clear({
			color: [0, 0, 0, 0],
			depth: 1
		});

		drawPoints({
			pointWidth: r * 2,
			strokeSize,
			pixelRatio,
			points: k.data,
			x: k.xGet,
			y: k.yGet,
			fillColor: hexToRgbPercent(fill),
			strokeColor: hexToRgbPercent(stroke)
		});
	});

	onDestroy(() => {
		if (regl) regl.destroy();
	});
</script>
