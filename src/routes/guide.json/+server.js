import getSections from '../../_modules/getSections.js';

/** @type {ReturnType<typeof getSections> | undefined} */
let data;

export async function GET() {
	if (!data || process.env.NODE_ENV !== 'production') {
		data = getSections();
	}

	return Response.json(data);
}
