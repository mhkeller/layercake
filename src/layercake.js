import { Store } from 'svelte/store.js';
import LayerCakeContainer from './LayerCakeContainer.html';

import Svg from './layouts/Svg.html';
import Html from './layouts/Html.html';
import Canvas from './layouts/Canvas.html';
import Webgl from './layouts/Webgl.html';

import defaultScales from './settings/defaultScales.js';
import calcExtents from './lib/calcExtents.js';
import getActiveKeys from './utils/getActiveKeys.js';
import partialDomain from './utils/partialDomain.js';
import makeAccessor from './utils/makeAccessor.js';
import padScale from './utils/padScale.js';
import omit from './utils/omit.js';

/* --------------------------------------------
 * Some named export helper functions
 */
export {default as newDiv} from './lib/newDiv.js';
export {default as scaleCanvas} from './lib/scaleCanvas.js';
export {default as flatten} from './lib/flatten.js';
export {default as uniques} from './lib/uniques.js';
export { calcExtents };

/* --------------------------------------------
 * Main class
 */
export default class LayerCakeStore extends Store {
	constructor (config) {
		/* --------------------------------------------
		 * Set border box so padding works correctly. In SSR mode,
		 * there's no need to set this.
		 */
		if (!config.ssr) {
			config.target.style['box-sizing'] = 'border-box';
		}

		/* --------------------------------------------
		 * Main values
		 */
		const coreValues = {
			data: config.data,
			containerWidth: config.width || config.target.clientWidth,
			containerHeight: config.height || config.target.clientHeight,
			layouts: [],
			target: config.target,
			custom: config.custom || {}
		};

		/* --------------------------------------------
		 * Values that computed properties are based on and that
		 * can be easily extended from config values
		 */
		const settings = Object.assign({
			activeKeys: getActiveKeys(config),
			activeGetters: [],
			xDomain: null,
			yDomain: null,
			rDomain: null,
			xNice: null,
			yNice: null,
			rNice: null,
			reverseX: false,
			reverseY: true,
			xPadding: null,
			yPadding: null,
			rPadding: null,
			xScale: null,
			yScale: null,
			rScale: null,
			rRange: null
		}, config);

		/* --------------------------------------------
		 * Preserve a copy of our passed in settings before we modify them
		 * Return this to the user's store so they can reference things if need be
		 * This is mostly an escape-hatch
		 */
		const originalSettings = Object.assign({}, settings);

		/* --------------------------------------------
		 * Make accessors for every active key
		 */
		settings.activeKeys.forEach(s => {
			settings[s] = makeAccessor(config[s]);
			settings.activeGetters.push({ dimension: s, get: settings[s] });
		});

		if (settings.data) {
			settings.flatData = settings.flatData || settings.data;
			settings.domains = calcExtents(settings.flatData, settings.activeKeys.map(key => {
				return {
					field: key,
					accessor: settings[key]
				};
			}));

			settings.activeKeys.forEach(s => {
				const thisDomain = `${s}Domain`;
				settings[thisDomain] = partialDomain(settings.domains[s], originalSettings[thisDomain]);
			});
		}

		/* --------------------------------------------
		 * We're going to add everything in settings and config onto our store
		 * except for a few that are computed down below, so omit this from what gets
		 * sent to super
		 */
		const computedValues = [
			...settings.activeKeys.map(s => `${s}Scale`),
			'rRange'
		];

		/* --------------------------------------------
		 * Assign these values to the store
		 */
		super(Object.assign(omit(settings, computedValues), coreValues, { originalSettings }));

		/* --------------------------------------------
		 * Use some of the settings to determine our computed values
		 */
		this.computeValues(settings, originalSettings);
	}

	computeValues (settings, originalSettings) {
		this.compute('padding', ['target', 'containerWidth', 'containerHeight', 'ssr'], (target, containerWidth, containerHeight, ssr) => {
			const defaultPadding = {top: 0, right: 0, bottom: 0, left: 0};
			let hasPadding = false;
			const padding = {};

			if (ssr) {
				// TODO: Can padding be defined in config if it's a computed
				// value?
				return defaultPadding;
			}

			const styles = window.getComputedStyle(target);
			Object.keys(defaultPadding).forEach(p => {
				const val = +styles.getPropertyValue(`padding-${p}`).replace('px', '') || 0;
				padding[p] = val;
				if (val) hasPadding = true;
			});
			if (hasPadding === true) {
				return padding;
			} else {
				return Object.assign(defaultPadding, settings.padding || {});
			}
		});

		this.compute('box', ['containerWidth', 'containerHeight', 'padding'], (containerWidth, containerHeight, padding) => {
			const b = {};
			b.top = padding.top;
			b.right = containerWidth - padding.right;
			b.bottom = containerHeight - padding.bottom;
			b.left = padding.left;
			b.width = b.right - b.left;
			b.height = b.bottom - b.top;
			return b;
		});

		this.compute('width', ['box'], (box) => {
			return box.width;
		});

		this.compute('height', ['box'], (box) => {
			return box.height;
		});

		if (settings.data) {
			/* --------------------------------------------
			 * Update the domain if the data has changed after we initialize
			 * Domain is not a computed property since we want to be able to set it sometimes
			 * but if the data changes, it should be recomputed
			 */
			this.on('state', ({ changed, current }) => {
				if (changed.data || changed.flatData) {
					const newSettings = {};
					newSettings.flatData = changed.flatData ? current.flatData : current.data;
					newSettings.domains = calcExtents(newSettings.flatData, current.activeKeys.map(key => {
						return {
							field: key,
							accessor: settings[key]
						};
					}));

					settings.activeKeys.forEach(s => {
						const thisDomain = `${s}Domain`;
						newSettings[thisDomain] = partialDomain(newSettings.domains[s], originalSettings[thisDomain]);
					});
					this.set(newSettings);
				}
			});

			/* --------------------------------------------
			 * Compute every domain and scale for which we have an accessor
			 */
			settings.activeKeys.forEach(s => {
				const thisScale = `${s}Scale`;
				this.compute(thisScale, ['width', 'height', 'domains', `${s}Domain`], (width, height, domains, thisDoughmain) => {
					if (domains === null) {
						return null;
					}
					const defaultRanges = {
						x: settings.reverseX ? [width, 0] : [0, width],
						y: settings.reverseY ? [height, 0] : [0, height],
						r: [1, 25]
					};
					const scale = settings[thisScale] ? settings[thisScale].copy() : defaultScales[s]();
					scale
						.domain(partialDomain(domains[s], thisDoughmain)) // on creation, `thisDoughmain` will already have any nulls filled in but if we set it via the store it might not, so rerun it through partialDomain
						.range(defaultRanges[s]);

					if (settings[`${s}Padding`]) {
						scale.domain(padScale(scale, settings[`${s}Padding`]));
					}

					if (settings[`${s}Nice`] === true) {
						if (typeof scale.nice === 'function') {
							scale.nice();
						} else {
							console.error(`Layer Cake warning: You set \`${s}Nice: true\` but the ${s}Scale does not have a \`.nice\` method. Ignoring...`);
						}
					}

					if (settings.rRange) {
						scale.range(settings.rRange);
					}

					return scale;
				});

				/* --------------------------------------------
				 * Compute a shorthand function to get the value and convert it using its scale
				 * exposed as `xGet`, `yGet` or `rGet`.
				 */
				const getter = `${s}Get`;
				this.compute(getter, [s, thisScale], (thisS, thisScale) => {
					return (d) => {
						const val = thisS(d);
						if (Array.isArray(val)) {
							return val.map(v => thisScale(v));
						}
						return thisScale(val);
					};
				});
			});
		}
	}

	render (opts = {}) {
		const { target, data } = this.get();
		const app = new LayerCakeContainer(Object.assign({}, opts, {
			target,
			data: { data },
			store: this
		}));

		return { app, store: this };
	}

	svgLayers (layers, opts = {}) {
		const { layouts } = this.get();
		layouts.push({ type: Svg, layers, opts });
		return this;
	}

	htmlLayers (layers, opts = {}) {
		const { layouts } = this.get();
		layouts.push({ type: Html, layers, opts });
		return this;
	}

	canvasLayers (layers, opts = {}) {
		const { layouts } = this.get();
		layouts.push({ type: Canvas, layers, opts });
		return this;
	}

	webglLayers (layers, opts = {}) {
		const { layouts } = this.get();
		layouts.push({ type: Webgl, layers, opts });
		return this;
	}
}
