/**
	A simple debounce function taken from here https://www.freecodecamp.org/news/javascript-debounce-example/
	@param {Function} func The function to debounce.
	@param {number} timeout The time in ms to wait.
	@returns {Function}
*/
const debounce = (func, timeout = 300) => {
	/** @type {string | number | NodeJS.Timeout | undefined} */
	let timer;
	return (/** @type {any[]} */ ...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

export default debounce;
