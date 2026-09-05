import partialDomain from '../utils/partialDomain.js';

/**
 * Calculate a dimension's domain from its best-known extent and the
 * user-passed `[name]Domain` prop, which can be a partial domain with
 * `null` values to be filled in from the extent or a function that
 * receives the extent and returns a domain.
 * @param {Array<any>|undefined} extent The best-known domain: the extent measured from the data when one exists, otherwise the scale's own current domain. See the `domain` derived in state/dimension.svelte.js for how the fallback is chosen.
 * @param {any} domain The user-passed `[name]Domain` prop – a partial or complete domain array or a function that receives the extent.
 * @returns {Array<any>|undefined} The domain, or undefined when there is neither an extent nor a user-passed domain, so the scale's own domain is preserved.
 */
export default function calcDomain(extent, domain) {
	if (typeof domain === 'function') {
		// `extent` is always a real domain here
		domain = domain(extent);
	}
	if (extent === undefined && domain === undefined) {
		return undefined;
	}
	return partialDomain(extent, domain);
}
