/** @param {string} input */
export async function compress_and_encode_text(input) {
	const reader = new Blob([input]).stream().pipeThrough(new CompressionStream('gzip')).getReader();
	let buffer = '';
	for (;;) {
		const { done, value } = await reader.read();
		if (done) {
			reader.releaseLock();
			return btoa(buffer).replaceAll('+', '-').replaceAll('/', '_');
		} else {
			for (let i = 0; i < value.length; i++) {
				// decoding as utf-8 will make btoa reject the string
				buffer += String.fromCharCode(value[i]);
			}
		}
	}
}
