import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable, requirementsTable, paymentsTable } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { toast } from '@zerodevx/svelte-toast';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { sql } from 'drizzle-orm';
import path from 'path';

export const load = async ({ fetch }) => {
	const response = await fetch('/admin/database');

	if (response.ok) {
		const data = await response.json();
		toast.pop();
		return {
			usersData: data.usersData,
			requestsData: data.requestsData,
			requirementsData: data.requirementsData
		};
	} else {
		throw error(response.status, 'Request Failed');
	}
};

export const actions = {
	approve: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_approved: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('/api/email', {
			method: 'POST',
			body: JSON.stringify({
				subject: `Request Approved for Request No. ${id}`,
				request_number: id,
				emailType: 'approve',
				previewMsg: `Your request has been approved.`,
				contentMsg: `This email is to inform you that your request has been approved by the OUR. Please wait for your requirements verification until further notice. Thank you!`,
				fname: fname,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (email_response.ok) {
			const emailSent = await email_response.json();
			if (emailSent.includes('250')) {
				// set cookies
			}
		}

		return { success: true };
	},
	verify: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');
		const emailId = data.get('emailId');

		await db_user.update(usersTable).set({ documents_approved: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('/api/email', {
			method: 'POST',
			body: JSON.stringify({
				subject: `Requirements Verified for Request No. ${id}`,
				request_number: id,
				emailType: 'verify',
				emailId: emailId,
				previewMsg: `Your request has been approved.`,
				contentMsg: `This email is to inform you that your requirements has been verified by the OUR. Please process your payment for your request/s. Then, you can upload your proof of payment by clicking the button below. Thank you!`,
				fname: fname,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (email_response.ok) {
			const emailSent = await email_response.json();
			if (emailSent.includes('250')) {
				// set cookies
			}
		}

		return { success: true };
	},
	paid: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_paid: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('/api/email', {
			method: 'POST',
			body: JSON.stringify({
				subject: `Payment Confirmation for Request No. ${id}`,
				request_number: id,
				emailType: 'available',
				previewMsg: `Your payment has been confirmed.`,
				contentMsg: `This email is to inform you that your payment for the requested documents has been confirmed by the OUR. Please wait for the email when your request documents are ready. Thank you!`,
				fname: fname,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (email_response.ok) {
			const emailSent = await email_response.json();
			if (emailSent.includes('250')) {
				// set cookies
			}
		}

		return { success: true };
	},
	available: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_available: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('/api/email', {
			method: 'POST',
			body: JSON.stringify({
				subject: `Documents Available for Request No. ${id}`,
				request_number: id,
				emailType: 'available',
				previewMsg: `You can now claim your requested documents.`,
				contentMsg: `This email is to inform you that you can now claim your requested documents in the Registrar's Office. Thank you!`,
				fname: fname,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (email_response.ok) {
			const emailSent = await email_response.json();
			if (emailSent.includes('250')) {
				// set cookies
			}
		}

		return { success: true };
	},
	finish: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const mname = data.get('mname');
		const lname = data.get('lname');
		const snum = data.get('snum');
		const email = data.get('email');
		const isScholar = data.get('scholarship') ? true : false;
		const totalPrice = data.get('totalPrice');
		const name = fname + ' ' + mname + ' ' + lname;

		const requests = await db_user
			.select({
				requestForms: requestsTable.document,
				requestPrices: requestsTable.price
			})
			.from(requestsTable)
			.where(eq(requestsTable.userId, id));

		let requestForms = [];
		let requestPrices = [];
		for (var i = 0, n = requests.length; i < n; i++) {
			requestForms.push(requests[i].requestForms);
			requestPrices.push(requests[i].requestPrices);
		}

		try {
			const pdf_response = await fetch('/api/generate-receipt', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					snum: snum,
					date: new Date().toDateString('fil-PH'),
					scholarship: isScholar,
					forms: requestForms,
					prices: requestPrices,
					total_price: totalPrice
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (pdf_response.ok) {
				const gen_pdf = await pdf_response.json();

				const email_response = await fetch('/api/email', {
					method: 'POST',
					body: JSON.stringify({
						subject: `Receipt for Request No. ${id}`,
						request_number: id,
						emailType: 'receipt',
						previewMsg: `Here's the receipt of your request. Thank you!`,
						contentMsg: `Attached document is the receipt of your request documents. Thank you for waiting!`,
						lname: lname,
						fname: fname,
						email: email,
						pdf: gen_pdf
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (email_response.ok) {
					const emailSent = await email_response.json();
					if (emailSent.includes('250')) {
						//set cookies
					}
				}
			}

			const req_db = await db_user
				.select({ upload_date: requirementsTable.upload_date })
				.from(requirementsTable)
				.where(eq(requirementsTable.userId, id));

			const pay_db = await db_user
				.select({ payment_path: paymentsTable.payment_path })
				.from(paymentsTable)
				.where(eq(paymentsTable.userId, id));

			await db_user.execute(
				sql`delete ${usersTable}, ${requestsTable}, ${requirementsTable}, ${paymentsTable} from ${requestsTable} left join ${usersTable} on (${requestsTable.userId} = ${usersTable.id}) left join ${requirementsTable} on (${requirementsTable.userId} = ${usersTable.id}) left join ${paymentsTable} on (${paymentsTable.userId} = ${usersTable.id}) where ${usersTable.id} = ${id}`
			);

			if (req_db.length > 0) {
				const { upload_date } = req_db[0];
				const datePath = path.join(
					process.cwd(),
					'requirements',
					upload_date.toISOString().split('T')[0]
				);
				const folderPath = path.join(datePath, `${id}`);

				const folderExists = existsSync(folderPath);
				if (folderExists) {
					for (const file of await fs.readdir(folderPath)) {
						await fs.unlink(path.join(folderPath, file));
					}
					await fs.rmdir(folderPath);
					const removePath = await fs.readdir(datePath);
					if (removePath.length <= 0) {
						await fs.rmdir(datePath);
					}
				}
			}
			if (pay_db.length > 0) {
				const { payment_path } = pay_db[0];
				const datePath = path.join(process.cwd(), 'payments', payment_path.split('\\')[1]);
				const paymentPath = path.join(process.cwd(), payment_path);
				const paymentFolderExists = existsSync(paymentPath);
				if (paymentFolderExists) {
					const file = await fs.readdir(paymentPath);
					await fs.unlink(path.join(paymentPath, file[0]));
					await fs.rmdir(paymentPath);
					const removePath = await fs.readdir(datePath);
					if (removePath.length <= 0) {
						await fs.rmdir(datePath);
					}
				}
			}
		} catch (error) {
			console.log(error.message);
		}

		return { success: true };
	},
	delete: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');
		const reason = data.get('reason');

		try {
			const email_response = await fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({
					subject: `Request Declined for Request No. ${id}`,
					request_number: id,
					emailType: 'delete',
					previewMsg: `Your request has been declined. Here's the reason why.`,
					contentMsg: `This email is to inform you that your request has been declined by the OUR. Here's the reason why:`,
					reason: reason,
					fname: fname,
					email: email
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (email_response.ok) {
				const emailSent = await email_response.json();
			}

			const req_db = await db_user
				.select({ upload_date: requirementsTable.upload_date })
				.from(requirementsTable)
				.where(eq(requirementsTable.userId, id));

			const pay_db = await db_user
				.select({ payment_path: paymentsTable.payment_path })
				.from(paymentsTable)
				.where(eq(paymentsTable.userId, id));

			await db_user.execute(
				sql`delete ${usersTable}, ${requestsTable}, ${requirementsTable}, ${paymentsTable} from ${requestsTable} left join ${usersTable} on (${requestsTable.userId} = ${usersTable.id}) left join ${requirementsTable} on (${requirementsTable.userId} = ${usersTable.id}) left join ${paymentsTable} on (${paymentsTable.userId} = ${usersTable.id}) where ${usersTable.id} = ${id}`
			);

			if (req_db.length > 0) {
				const { upload_date } = req_db[0];
				const datePath = path.join(
					process.cwd(),
					'requirements',
					upload_date.toISOString().split('T')[0]
				);
				const folderPath = path.join(datePath, `${id}`);

				const folderExists = existsSync(folderPath);
				if (folderExists) {
					for (const file of await fs.readdir(folderPath)) {
						await fs.unlink(path.join(folderPath, file));
					}
					await fs.rmdir(folderPath);
					const removePath = await fs.readdir(datePath);
					if (removePath.length <= 0) {
						await fs.rmdir(datePath);
					}
				}
			}
			if (pay_db.length > 0) {
				const { payment_path } = pay_db[0];
				const datePath = path.join(process.cwd(), 'payments', payment_path.split('\\')[1]);
				const paymentPath = path.join(process.cwd(), payment_path);
				const paymentFolderExists = existsSync(paymentPath);
				if (paymentFolderExists) {
					const file = await fs.readdir(paymentPath);
					await fs.unlink(path.join(paymentPath, file[0]));
					await fs.rmdir(paymentPath);
					const removePath = await fs.readdir(datePath);
					if (removePath.length <= 0) {
						await fs.rmdir(datePath);
					}
				}
			}
		} catch (error) {
			console.log(error.message);
		}
		return { success: true };
	}
};
