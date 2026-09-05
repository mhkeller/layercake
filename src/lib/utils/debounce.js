/**
	A simple debounce function taken from here https://www.freecodecamp.org/news/javascript-debounce-example/
	@param {Function} func The function to debounce.
	@param {number} timeout The time in ms to wait before calling `func`
	@returns {((...args: unknown[]) => void) & { cancel: () => void }} Returns a debounced version of `func` with a `cancel` method that drops any pending call.
*/
const debounce = (func, timeout = 300) => {
	/** @type {ReturnType<typeof setTimeout>} */
	let timer;
	const debounced = (/** @type {any[]} */ ...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
	// `cancel` drops a pending call. A chart calls it when it unmounts so a
	// timer set just before doesn't fire for a chart that's gone.
	debounced.cancel = () => clearTimeout(timer);
	return debounced;
};

export default debounce;
