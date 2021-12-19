import getSections from '../../../modules/getSections.js';

export async function get () {
	let json;
	if (process.env.NODE_ENV !== 'production') {
		json = getSections(false);
	}

	console.log('json', json);

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: json
	};
}
