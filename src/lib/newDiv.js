export default function newDiv (klass, styles = {}, parent) {
	var div = document.createElement('div');
	const keys = Object.keys(styles);
	const kl = keys.length;
	for (let i = 0; i < kl; i++) {
		div.style[keys[i]] = styles[keys[i]];
	}
	div.classList.add(klass);
	if (parent) {
		return parent.appendChild(div);
	}
	return div;
}
