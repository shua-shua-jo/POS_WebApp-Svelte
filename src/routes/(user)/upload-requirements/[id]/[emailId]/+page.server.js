import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable, requirementsTable } from '$lib/server/schema.js';
import { getRequirements, parseISOString } from '$lib/server/utils.js';
import { redirect, error as s_error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { toast } from '@zerodevx/svelte-toast';

export const load = async ({ cookies, params }) => {
	const id = params.id;
	const email_id = params.emailId;

	let upload = true;
	let req_message;

	if (!email_id) {
		upload = false;
		throw s_error(403, 'Unauthorized');
	}

	const user = await db_user
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, id), eq(usersTable.email_id, email_id));

	if (user.length <= 0) {
		cookies.set('req-error', 'User not found.', {
			path: '/'
		});
		throw redirect(307, '/');
	}

	if (cookies.get('req-message')) {
		req_message = cookies.get('req-message');
		upload = false;
		cookies.delete('req-message');
	}
	toast.pop();

	const req_db = await db_user
		.select({ upload_date: requirementsTable.upload_date })
		.from(requirementsTable)
		.where(eq(requirementsTable.userId, id));

	if (req_db.length > 0) {
		const { upload_date } = req_db[0];

		const folderPath = path.join(
			process.cwd(),
			'requirements',
			upload_date.toISOString().split('T')[0],
			`${id}`
		);
		const folderExists = existsSync(folderPath);

		if (folderExists) {
			upload = false;
			return { message: req_message, id: id, upload: upload };
		}
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

		try {
			// add to db
			const date = new Date();
			const localDate =
				date.toLocaleDateString('fil-PH', { year: 'numeric' }) +
				'-' +
				date.toLocaleDateString('fil-PH', { month: '2-digit' }) +
				'-' +
				date.toLocaleDateString('fil-PH', { day: '2-digit' }) +
				'T' +
				date.toLocaleString('fil-PH', { hour: '2-digit', hour12: false }) +
				':' +
				date.toLocaleString('fil-PH', { minute: '2-digit' }) +
				':' +
				date.toLocaleString('fil-PH', { second: '2-digit' }) +
				'.' +
				date.getMilliseconds() +
				'Z';

			const parsedDate = parseISOString(localDate);

			const folderPathDate = path.join(process.cwd(), 'requirements', localDate.split('T')[0]);

			if (!existsSync(folderPathDate)) {
				await fs.mkdir(folderPathDate);
			}

			const folderPathUser = path.join(folderPathDate, id);
			if (existsSync(folderPathUser)) {
				throw s_error(400, 'Requirements already submitted');
			}

			const requirements = file_types.map((item, index) => ({
				upload_date: parsedDate,
				tcg_format: item == 'Preferred Format for True Copy of Grades' ? tcg : null,
				file_name: item == 'Preferred Format for True Copy of Grades' ? null : files[index].name,
				requirement_type: file_types[index],
				userId: id
			}));

			const reqdb = await db_user.insert(requirementsTable).values(requirements);
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
