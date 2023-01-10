import { json } from '@sveltejs/kit';
import getSections from '../../_modules/getSections.js';

let data;

export async function GET() {
	if (!data || process.env.NODE_ENV !== 'production') {
		data = getSections();
	}

	return json(data);
}
