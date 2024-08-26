import partialDomain from '../utils/partialDomain.js';

export default function calcDomain(s) {
	return function domainCalc([$extents, $domain]) {
		if (typeof $domain === 'function') {
			$domain = $domain($extents[s]);
		}
		return $extents ? partialDomain($extents[s], $domain) : $domain;
	};
}
