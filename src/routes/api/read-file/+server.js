import { error, json } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs/promises';

export async function GET({ url, setHeaders }) {
	const param_path = url.searchParams.get('path');
	const file_type = url.searchParams.get('type');

	if (!param_path) {
		throw error(404, { message: 'File not found.' });
	}

	const temp = param_path.split('/');
	const fileName = temp[temp.length - 1];
	const dir = path.resolve(path.dirname(''));
	const filePath = path.join(dir, param_path);

	const file = await fs.readFile(filePath);
	const blob = new Blob(file, { type: file_type.toString() });

	setHeaders({
		'Content-Type': blob.type,
		'Cache-Control': 'private, max-age=31536000',
		'Content-Disposition': `inline; filename=${fileName}`
	});
	return new Response(file);
}
