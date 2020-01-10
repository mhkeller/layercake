import partialDomain from '../utils/partialDomain.js';

export default	function calcDomain (which) {
	return function domainCalc ([$extents, $domain]) {
		return $extents ? partialDomain($extents[which], $domain) : $domain;
	};
}
