// Helper functions for creating swoopy arrows

// Turn a CSS-ish length into a number. Numbers pass straight through, `'12px'`
// loses its unit, and `'50%'` is measured against the chart – `i` picks which
// side, 0 for width and 1 for height, matching the order of an [x, y] pair.
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

// Where an element sits inside its parent, so an arrow has something to aim at.
// getBoundingClientRect measures from the viewport, so subtract the parent's own
// box to get back into the coordinate space the arrows are drawn in.
export function getElPosition(el) {
	const annotationBbox = el.getBoundingClientRect();
	const parentBbox = el.parentNode.getBoundingClientRect();
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
	let xValue = d => d[0];
	let yValue = d => d[1];

	function hypotenuse(a, b) {
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	}

	function render(data) {
		data = data.map(d => {
			return [xValue(d), yValue(d)];
		});

		// The arrow is an arc cut from some circle, and these three lines work out
		// which circle. Start with the straight-line distance between the two
		// points – the chord the arc will bow away from.
		const h = hypotenuse(data[1][0] - data[0][0], data[1][1] - data[0][1]);

		// A wider `angle` means a flatter arc, which means the center of the circle
		// sits further back from the chord. This is that distance.
		const d = h / (2 * Math.tan(angle / 2));

		// Center to endpoint, which is the radius we needed.
		const r = hypotenuse(d, h / 2);

		// Now write that circle out as an SVG arc. Reading `M 200,50 a 50,50 0 0,1 100,0`
		// one piece at a time:
		//
		//   M 200,50   move the pen to (200,50)
		//   a          draw an elliptical arc
		//     50,50    on an ellipse whose two radii are equal, so really just a circle
		//     0        with no x-axis rotation, which does nothing to a circle anyway
		//     0,1      large-arc-flag 0 and sweep-flag 1, i.e. the short way, clockwise
		//     100,0    ending 100 further along x and level in y, at (300,50)
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

	render.angle = function renderAngle(_) {
		if (!arguments.length) return angle;
		angle = Math.min(Math.max(_, 1e-6), Math.PI - 1e-6);
		return render;
	};

	render.clockwise = function renderClockwise(_) {
		if (!arguments.length) return clockwise;
		clockwise = !!_;
		return render;
	};

	render.x = function renderX(_) {
		if (!arguments.length) return xValue;
		xValue = _;
		return render;
	};

	render.y = function renderY(_) {
		if (!arguments.length) return yValue;
		yValue = _;
		return render;
	};

	return render;
}
