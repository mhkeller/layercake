/* --------------------------------------------
 *
 * Similar to underscore's _.omit, return a copy
 * of the object without the blacklisted keys
 *
 * --------------------------------------------
 */
export default function omit (obj = {}, keys = []) {
	const newObj = {};
	Object.keys(obj).forEach(key => {
		if (!keys.includes(key)) {
			newObj[key] = obj[key];
		}
	});
	return newObj;
};
