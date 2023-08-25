import { db_user } from '$lib/server/db.js';
import { usersTable, paymentsTable } from '$lib/server/schema.js';
import { parseISOString } from '$lib/server/utils.js';
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

	const pay_db = await db_user
		.select({ payment_path: paymentsTable.payment_path })
		.from(paymentsTable)
		.where(eq(paymentsTable.userId, id));

	if (pay_db.length > 0) {
		const { payment_path } = pay_db[0];

		const paymentPath = path.join(process.cwd(), payment_path);
		const folderExists = existsSync(paymentPath);
		console.log(paymentPath);
		console.log(folderExists);
		if (folderExists) {
			upload = false;
			return { message: req_message, id: id, upload: upload };
		}
	}

	return { message: req_message, upload: upload, id: id, userData: user };
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const payment = data.get('payment');

		try {
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
			const pathDate = path.join('payments', localDate.split('T')[0]);

			const folderPathDate = path.join(process.cwd(), pathDate);

			if (!existsSync(folderPathDate)) {
				await fs.mkdir(folderPathDate);
			}

			const paymentPath = path.join(folderPathDate, id);
			if (existsSync(paymentPath)) {
				throw s_error(400, 'Requirements already submitted');
			}

			const pay_db = await db_user.insert(paymentsTable).values({
				payment_path: path.join(pathDate, id),
				file_name: payment.name,
				userId: id
			});

			const user_db = await db_user
				.update(usersTable)
				.set({ payment_date: parsedDate })
				.where(eq(usersTable.id, id));
			await fs.mkdir(paymentPath);

			const arraybuf = await payment.arrayBuffer();
			const buf = Buffer.from(arraybuf);
			await fs.writeFile(path.join(paymentPath, payment.name), buf);

			cookies.set('req-message', 'Payment Confirmation has been uploaded.');
		} catch (error) {
			console.log(error);
			throw s_error(400, error.message);
		}
	}
};
