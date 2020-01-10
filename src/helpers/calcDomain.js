import partialDomain from '../utils/partialDomain.js';

export default	function calcDomain (s) {
	return function domainCalc ([$extents, $domain]) {
		return $extents ? partialDomain($extents[s], $domain) : $domain;
	};
}
