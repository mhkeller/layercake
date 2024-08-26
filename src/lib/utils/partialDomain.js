/**
	If we have a domain from settings (the directive), fill in
	any null values with ones from our measured extents
	otherwise, return the measured extent
	@param {Number[]} domain A two-value array of numbers
	@param {Number[]} directive A two-value array of numbers that will have any nulls filled in from the `domain` array
	@returns {Number[]} The filled in domain
*/
export default function partialDomain(domain = [], directive) {
	if (Array.isArray(directive) === true) {
		return directive.map((d, i) => {
			if (d === null) {
				return domain[i];
			}
			return d;
		});
	}
	return domain;
}
