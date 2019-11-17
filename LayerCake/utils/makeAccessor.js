import canBeZero from './canBeZero.js';

export default function makeAccessor (acc) {
	if (!canBeZero(acc)) return null;
	if (Array.isArray(acc)) {
		return d => acc.map(k => typeof k !== 'function' ? d[k] : k(d));
	} else if (typeof acc !== 'function') {
		return d => d[acc];
	} else {
		return acc;
	}
}
