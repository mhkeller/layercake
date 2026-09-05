import partialDomain from '../utils/partialDomain.js';

/**
 * Work out a dimension's domain from the measured extent and the user's
 * `[name]Domain` prop. The prop can be a full domain, a partial one with
 * `null` placeholders that get filled in from the extent, or a function that
 * receives the extent and returns a domain.
 * @param {Array<any>|undefined} extent The extent measured from the data. When nothing was measured, this is the scale's own domain instead. See `extent` and `fallbackDomain` in state/dimension.svelte.js.
 * @param {any} domain The user-passed `[name]Domain` prop: a full or partial domain array, or a function that receives the extent.
 * @returns {Array<any>|undefined} The domain. Undefined when there is neither an extent nor a user domain, which keeps the scale's own domain.
 */
export default function calcDomain(extent, domain) {
	if (typeof domain === 'function') {
		// `extent` is always a real array here, even when nothing was measured.
		// See `fallbackDomain` in state/dimension.svelte.js.
		domain = domain(extent);
	}
	if (extent === undefined && domain === undefined) {
		return undefined;
	}
	return partialDomain(extent, domain);
}
