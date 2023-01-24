import getSections from '../../../_modules/getSections.js';

let json;
export async function GET() {
	if (!json || process.env.NODE_ENV !== 'production') {
		json = getSections(false);
	}

	return new Response(JSON.stringify(json), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
