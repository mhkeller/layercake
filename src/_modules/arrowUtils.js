// Helper functions for creating swoopy arrows

/**
 * Turn a length into a number of pixels. A number is returned as is. `'12px'`
 * becomes 12. `'50%'` is measured against the chart size. `i` says which side
 * to measure against: 0 for width and 1 for height, the same order as [x, y].
 * @param {string|number|null|undefined} d
 * @param {number} i
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
export function parseCssValue(d, i, width, height) {
	if (!d) return 0;
	if (typeof d === 'number') {
		return d;
	}
	if (d.indexOf('%') > -1) {
		return (+d.replace('%', '') / 100) * (i ? height : width);
	}
	return +d.replace('px', '');
}

/**
 * Find where an element sits inside its parent. That's the spot an arrow points
 * at. getBoundingClientRect measures from the top of the page, so subtract the
 * parent's position to get coordinates the arrows can use.
 * @param {Element} el
 * @returns {{ top: number, right: number, bottom: number, left: number, width: number, height: number }}
 */
export function getElPosition(el) {
	const annotationBbox = el.getBoundingClientRect();
	const parentBbox = (el.parentElement ?? el).getBoundingClientRect();
	const coords = {
		top: annotationBbox.top - parentBbox.top,
		right: annotationBbox.right - parentBbox.left,
		bottom: annotationBbox.bottom - parentBbox.top,
		left: annotationBbox.left - parentBbox.left,
		width: annotationBbox.width,
		height: annotationBbox.height
	};
	return coords;
}

// Draws the curved arrow itself. Adapted from bizweekgraphics/swoopyarrows.
export function swoopyArrow() {
	let angle = Math.PI;
	let clockwise = true;
	/** @type {(d: any) => number} */
	let xValue = d => d[0];
	/** @type {(d: any) => number} */
	let yValue = d => d[1];

	/**
	 * @param {number} a
	 * @param {number} b
	 * @returns {number}
	 */
	function hypotenuse(a, b) {
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	}

	/**
	 * @param {any[]} data
	 * @returns {string}
	 */
	function render(data) {
		data = data.map(d => {
			return [xValue(d), yValue(d)];
		});

		// The arrow is a piece of a circle. The next three lines work out which
		// circle. Start with the straight-line distance between the two points.
		// The arc bows away from that line.
		const h = hypotenuse(data[1][0] - data[0][0], data[1][1] - data[0][1]);

		// How far the circle's center sits from that straight line. A wider
		// `angle` means a flatter arc and a center that sits further back.
		const d = h / (2 * Math.tan(angle / 2));

		// The distance from the center to either endpoint is the circle's radius.
		const r = hypotenuse(d, h / 2);

		// Write the arc out as an SVG path. Here is what each part of an example
		// path `M 200,50 a 50,50 0 0,1 100,0` means:
		//
		//   M 200,50   start at (200,50)
		//   a          draw an arc
		//     50,50    the two radii. Equal radii make it a circle
		//     0        the x-axis rotation. It has no effect on a circle
		//     0,1      large-arc-flag 0 and sweep-flag 1: take the short way, clockwise
		//     100,0    end 100 to the right and level with the start, at (300,50)
		//
		// Full syntax: http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
		const path =
			'M ' +
			data[0][0] +
			',' +
			data[0][1] +
			' a ' +
			r +
			',' +
			r +
			' 0 0,' +
			(clockwise ? '1' : '0') +
			' ' +
			(data[1][0] - data[0][0]) +
			',' +
			(data[1][1] - data[0][1]);

		return path;
	}

	/** @param {number} [_] */
	render.angle = function renderAngle(_) {
		if (!arguments.length) return angle;
		angle = Math.min(Math.max(/** @type {number} */ (_), 1e-6), Math.PI - 1e-6);
		return render;
	};

	/** @param {boolean} [_] */
	render.clockwise = function renderClockwise(_) {
		if (!arguments.length) return clockwise;
		clockwise = !!_;
		return render;
	};

	/** @param {(d: any) => number} [_] */
	render.x = function renderX(_) {
		if (!arguments.length) return xValue;
		xValue = /** @type {(d: any) => number} */ (_);
		return render;
	};

	/** @param {(d: any) => number} [_] */
	render.y = function renderY(_) {
		if (!arguments.length) return yValue;
		yValue = /** @type {(d: any) => number} */ (_);
		return render;
	};

	return render;
}
