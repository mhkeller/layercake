import partialDomain from '../utils/partialDomain.js';

/**
 * Calculate a dimension's domain from the measured extents and the
 * user-passed `[name]Domain` prop, which can be a partial domain with
 * `null` values to be filled in from the data or a function that
 * receives the measured extent and returns a domain.
 * @param {string} name The dimension name, e.g. `'x'`.
 * @param {Object.<string, Array<any>>} extents The measured extents keyed by dimension name.
 * @param {any} domain The user-passed `[name]Domain` prop – a partial or complete domain array or a function that receives the measured extent.
 * @returns {Array<any>|undefined} The domain, or undefined when there is neither a measured extent nor a user-passed domain – e.g. a dimension activated only via its scale prop – so the scale's own domain is preserved.
 */
export default function calcDomain(name, extents, domain) {
	if (typeof domain === 'function') {
		domain = domain(extents[name]);
	}
	if (extents[name] === undefined && domain === undefined) {
		return undefined;
	}
	return partialDomain(extents[name], domain);
}
