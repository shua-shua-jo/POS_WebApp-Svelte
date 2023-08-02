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

	const newDate = new Date()
		.toLocaleDateString('fil-PH', { month: '2-digit', day: '2-digit', year: 'numeric' })
		.replaceAll('/', '-');
	const folderPathDate = path.join(process.cwd(), 'requirements', newDate);
	const folderPathUser = path.join(folderPathDate, `${id}`);

	const folderExists = existsSync(folderPathUser);

	if (folderExists) {
		upload = false;
		return { id: id, upload: upload };
	}

	const requests = await db_user.select().from(requestsTable).where(eq(requestsTable.userId, id));

	const req = getRequirements(Array.from(requests, (value) => value.document));

	if (req.size <= 0) {
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

		console.log(files instanceof File);
		console.log(files instanceof Buffer);
		try {
			// add to db
			const newDate = new Date()
				.toLocaleDateString('fil-PH', { month: '2-digit', day: '2-digit', year: 'numeric' })
				.replaceAll('/', '-');
			const folderPathDate = path.join(process.cwd(), 'requirements', newDate);

			console.log(folderPathDate);

			if (!existsSync(folderPathDate)) {
				await fs.mkdir(folderPathDate);
			}

			const folderPathUser = path.join(folderPathDate, `${id}`);
			if (existsSync(folderPathUser)) {
				throw s_error(400, 'Requirements already submitted');
			}
			await fs.mkdir(folderPathUser);

			for (var i = 0, n = files.length; i < n; i++) {
				const arraybuf = await files[i].arrayBuffer();
				const buf = Buffer.from(arraybuf);
				await fs.writeFile(path.join(folderPathUser, files[i].name), buf);
			}
			cookies.set('req-message', 'Requirements has been uploaded.');
		} catch (error) {
			console.log(error);
			throw s_error(400, error.message);
		}
	}
};
