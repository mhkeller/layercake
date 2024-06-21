import emoji from 'emoji-regex';

const whitespace = /\s/g;

export default function slugger(string, maintainCase, store) {
	const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
	const replacement = '-';

	if (typeof string !== 'string') return '';
	if (!maintainCase) string = string.toLowerCase();
	const slug = string
		.trim()
		.split('(')[0]
		.replace(re, '')
		.replace(emoji(), '')
		.replace(whitespace, replacement)
		.split('-code')[0]
		.replace(/^cake/, '');

	if (typeof store[slug] === 'undefined') {
		store[slug] = -1;
	}

	store[slug] += 1;

	// Not sure why these numbers go really high
	// so do some weird substractions and things to make
	// them turn out correctly
	if (store[slug] > 0) {
		return `${slug}-${store[slug]}`;
	}

	return slug;
}
