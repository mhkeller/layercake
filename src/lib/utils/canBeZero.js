/**
	A function to help truth test values. Returns a `true` if zero.
	@param {any} val The value to test.
	@returns {any}
*/
export default function canBeZero(val) {
	if (val === 0) {
		return true;
	}
	return val;
}
