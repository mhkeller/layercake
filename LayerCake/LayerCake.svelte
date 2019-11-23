<script>
import { setContext } from 'svelte';
import { writable, derived, get } from 'svelte/store';
import { key } from './key.js';

import calcExtents from './lib/calcExtents.js';
import omit from './utils/omit.js';
import makeAccessor from './utils/makeAccessor.js';
import partialDomain from './utils/partialDomain.js';
import setContextEl from './utils/setContextEl.js';
import getDefaultRanges from './settings/getDefaultRanges.js';
import defaultScales from './settings/defaultScales.js';

export let x;
export let y;
export let r;
export let data = [];
export let custom = {};

export let activeGetters = [];
export let xDomain = null;
export let yDomain = null;
export let rDomain = null;
export let xNice = null;
export let yNice = null;
export let rNice = null;
export let reverseX = false;
export let reverseY = true;
export let xPadding = null;
export let yPadding = null;
export let rPadding = null;
export let xScale = null;
export let yScale = null;
export let rScale = null;
export let rRange = null;
export let flatData;

let container;
let target = {};
$: if (container) {
	target = container.parentNode;
}

const keys = [
	{ dimension: 'x', fn: x },
	{ dimension: 'y', fn: y },
	{ dimension: 'r', fn: r }
];

const activeKeys = keys.filter(k => k.fn);
const config = {
	data,
	xDomain,
	yDomain,
	rDomain,
	xNice,
	yNice,
	rNice,
	reverseX,
	reverseY,
	xPadding,
	yPadding,
	rPadding,
	xScale,
	yScale,
	rScale,
	rRange,
	flatData
};

/* --------------------------------------------
 * Main values
 */
const coreValues = {
	data: config.data,
	containerWidth: target.clientWidth,
	containerHeight: target.clientHeight,
	layouts: [],
	target: target,
	custom: config.custom || {}
};

/* --------------------------------------------
 * Preserve a copy of our passed in settings before we modify them
 * Return this to the user's store so they can reference things if need be
 * This is mostly an escape-hatch
 */
const originalSettings = Object.assign({}, config);

const settings = Object.assign({
	activeGetters: [],
	activeKeys
}, config);

/* --------------------------------------------
 * Make accessors for every active key
 */
activeKeys.forEach(k => {
	settings[k.dimension] = makeAccessor(k.fn);
	settings.activeGetters.push({ dimension: k.dimension, get: settings[k.dimension] });
});

if (settings.data) {
	settings.flatData = settings.flatData || settings.data;
	settings.domains = calcExtents(settings.flatData, settings.activeKeys.map(k => {
		return {
			field: k.dimension,
			accessor: settings[k.dimension]
		};
	}));

	settings.activeKeys.forEach(k => {
		if (settings.domains) {
			const thisDomain = `${k.dimension}Domain`;
			settings[thisDomain] = partialDomain(settings.domains[k.dimension], originalSettings[thisDomain]);
		}
	});
}

/* --------------------------------------------
 * We're going to add everything in settings and config onto our store
 * except for a few that are computed down below, so omit this from what gets
 * sent to super
 */
const computedValues = [
	...settings.activeKeys.map(k => `${k.dimension}Scale`),
	'rRange'
];

/* --------------------------------------------
 * Assign these values to the store
 */
const contextToSet = Object.assign(omit(settings, computedValues), coreValues, { originalSettings });

const containerWidth = writable(1);
const containerHeight = writable(1);

// contextToSet.containerWidth = containerWidth;
// contextToSet.containerHeight = containerHeight;

/* --------------------------------------------
 * Derive padding
 */
const padding = derived([containerWidth, containerHeight], ([$a, $b]) => {
	const defaultPadding = {top: 0, right: 0, bottom: 0, left: 0};
	let hasPadding = false;
	let padding = {};

	// const styles = window.getComputedStyle(target);
	// Object.keys(defaultPadding).forEach(p => {
	// 	const val = +styles.getPropertyValue(`padding-${p}`).replace('px', '') || 0;
	// 	padding[p] = val;
	// 	if (val) hasPadding = true;
	// });
	if (hasPadding === false) {
		padding = Object.assign(defaultPadding, settings.padding || {});
	}
	return padding;
});

/* --------------------------------------------
 * Derive box from containerWidth, containerHeight and padding
 */
const box = derived([containerWidth, containerHeight, padding], ([$w, $h, $p]) => {
	const b = {};
	b.top = $p.top;
	b.right = $w - $p.right;
	b.bottom = $h - $p.bottom;
	b.left = $p.left;
	b.width = b.right - b.left;
	b.height = b.bottom - b.top;
	return box;
});

/* --------------------------------------------
 * Derive dimensions
 */
const width = derived([box], $box => {
	return box.width;
});

const height = derived([box], $box => {
	return box.height;
});

/* --------------------------------------------
 * Derive domains
 */
$: if (data) (data, flatData, updateDomains());
let domains;
if (data) {
	domains = derived([data, flatData], ($d, $fd) => {
		return calcExtents($fd, activeKeys.map(k => {
			return {
				field: k.dimension,
				accessor: settings[k.dimension]
			};
		}));
	});

	/* --------------------------------------------
	 * Take any partial domain directives into account to figure out what domain the user wants
	 */
	const filledDomains = {};
	activeKeys.forEach(k => {
		const thisDomain = `${k.dimension}Domain`;
		const d = partialDomain(domains[k.dimension], originalSettings[thisDomain]);
		filledDomains[thisDomain] = d;
	});

}

function updateDomains () {
	domains =

	setContextEl('domains', domains);
}

/* --------------------------------------------
 * Update scales
 */
$: if (x) (width, height, domains, xScale, updateScale({ name: 'x', accessor: settings.x, scale: settings.xScale }));
$: if (y) (width, height, domains, yScale, updateScale({ name: 'y', accessor: settings.y, scale: settings.yScale }));
$: if (r) (width, height, domains, rScale, updateScale({ name: 'r', accessor: settings.r, scale: settings.rScale }));
function updateScale (d) {
	const s = d.name;
	const acc = d.accessor;
	const thisScale = `${s}Scale`;
	const thisDoughmain = domains[s];
	if (domains === null) {
		setContextEl(thisScale, null);
		return;
	}

	console.log(width, height, settings.width, settings.height);
	const defaultRange = getDefaultRanges(s, settings, settings.width, settings.height);

	const scale = settings[thisScale] ? settings[thisScale].copy() : defaultScales[s]();

	scale
		.domain(partialDomain(domains[s], thisDoughmain)) // on creation, `thisDoughmain` will already have any nulls filled in but if we set it via the store it might not, so rerun it through partialDomain
		.range(defaultRange);

	if (settings[`${s}Padding`]) {
		scale.domain(scale, settings[`${s}Padding`]);
		// scale.domain(padScale(scale, settings[`${s}Padding`]));
	}

	if (settings[`${s}Nice`] === true) {
		if (typeof scale.nice === 'function') {
			scale.nice();
		} else {
			console.error(`Layer Cake warning: You set \`${s}Nice: true\` but the ${s}Scale does not have a \`.nice\` method. Ignoring...`);
		}
	}

	setContextEl(thisScale, scale);

	const getter = `${s}Get`;
	const getterFn = q => {
		const val = acc(q);
		console.log(q, val, scale(val));
		if (Array.isArray(val)) {
			return val.map(v => scale(v));
		}
		return scale(val);
	};
	setContextEl(getter, getterFn);
}
</script>

<div
	bind:this={container}
	bind:clientWidth={$containerWidth}
	bind:clientHeight={$containerHeight}
	class="layercake-container"
>
	<slot></slot>
</div>

<style>
	:global(.layercake-container),
	:global(.layercake-container *) {
		box-sizing: border-box;
	}
	.layercake-container {
		width: 100%;
		height: 100%;
	}
</style>
