/**
 * @param {BlobPart|Blob} blob
 * @param {string} filename
 * @param {boolean} [createBlob=false]
 */
export default function downloadBlob(blob, filename, createBlob = false) {
	let myBlob;
	if (createBlob === true) {
		myBlob = new Blob([/** @type {BlobPart} */ (blob)], { type: 'octet/stream' });
	} else {
		myBlob = /** @type {Blob} */ (blob);
	}
	const url = URL.createObjectURL(myBlob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();
	URL.revokeObjectURL(url);
	link.remove();
}
