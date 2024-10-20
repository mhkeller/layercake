/**
 * Whether we need to calculate the domain or not
 * @param {Array<string|number|null>|Function|undefined} domain - The domain to check
 * @returns {boolean|Array<string|number>} Whether we need to calculate the domain
 */
export default function getCompleteDomain(domain) {
	// If there's no domain, calculate it
	if (!domain) return false;
	// If the domain is a function, calculate it
	if (typeof domain === 'function') return false;
	// If the domain is an array with a null value, calculate it
	if (Array.isArray(domain) && domain.includes(null)) return false;
	// Otherwise, don't calculate it
	// @ts-ignore
	return domain;
}
