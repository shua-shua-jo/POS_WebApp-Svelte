import { db_user } from '$lib/server/db.js';
import { requestsTable } from '$lib/server/schema.js';
import { getRequirements } from '$lib/server/utils.js';
import { redirect, error as s_error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { toast } from '@zerodevx/svelte-toast';

export const load = async ({ cookies, params }) => {
	const id = params.id;
	let upload = true;
	let req_message;

	if (cookies.get('req-message')) {
		req_message = cookies.get('req-message');
		upload = false;
		cookies.delete('req-message');
	}

	toast.pop();

	const folderPath = path.join(process.cwd(), 'requirements', `${id}`);

	const folderExists = existsSync(folderPath);

	if (folderExists) {
		upload = false;
	}

	const requests = await db_user.select().from(requestsTable).where(eq(requestsTable.userId, id));

	const req = getRequirements(requests);

	if (req <= 0) {
		cookies.set('req-error', 'Request not found or <br/> Requirements already satisfied.', {
			path: '/'
		});
		throw redirect(307, '/');
	}

	return { message: req_message, upload: upload, id: id, requirements: req };
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const tcg = data.get('tcg') || null;
		const files = data.getAll('files');
		const file_types = data.getAll('fileTypes');

		try {
			const folderPath = path.join(process.cwd(), 'requirements', `${id}`);
			if (existsSync(folderPath)) {
				throw s_error(400, 'Requirements already submitted');
			}
			await fs.mkdir(folderPath);

			for (var i = 0, n = files.length; i < n; i++) {
				const arraybuf = await files[i].arrayBuffer();
				const buf = Buffer.from(arraybuf);
				await fs.writeFile(path.join(folderPath, files[i].name), buf);
			}
			cookies.set('req-message', 'Requirements has been uploaded.');
		} catch (error) {
			console.log(error);
			throw s_error(400, error.message);
		}
	}
};
