/**
 * If val is a date, return its time. Otherwise, return val.
 */
export default function getTime (val) {
	if (Object.prototype.toString.call(val) === '[object Date]') {
		return val.getTime();
	}
	return val;
}
