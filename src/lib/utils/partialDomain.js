/**
	Fill in any null or undefined values in the user's domain with the measured
	extent. If the user didn't pass a domain, return the measured extent.
	@param {number[]} domain The measured extent, a two-value array of numbers
	@param {number[]} directive The user's domain. Any nulls in it get filled in from `domain`
	@returns {number[]} The filled in domain
*/
export default function partialDomain(domain = [], directive) {
	if (Array.isArray(directive) === true) {
		return directive.map((d, i) => {
			// `null` is the documented way to say "fill this end in from the data".
			// `undefined` is the same request typed a slightly different way.
			if (d === null || d === undefined) {
				return domain[i];
			}
			return d;
		});
	}
	return domain;
}
