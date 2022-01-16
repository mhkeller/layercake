/**
	A function to help truth test values. Returns a `true` if zero.
	@type {number} val The value to test.
	@returns {boolean}
*/
export default function canBeZero (val) {
	if (val === 0) {
		return true;
	}
	return val;
}
