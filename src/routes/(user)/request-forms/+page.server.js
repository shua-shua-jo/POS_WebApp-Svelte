import { formData } from '$lib/server/lists.js';
import { toast } from '@zerodevx/svelte-toast';
import { redirect, error as s_error } from '@sveltejs/kit';
import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { validateEmail, validateSnum } from '$lib/server/validate.js';
import { parseISOString } from '$lib/server/utils.js';
import { eq } from 'drizzle-orm';
import { getRequirements } from '$lib/server/utils.js';

export async function load({ cookies }) {
	const success = cookies.get('success');
	const message = cookies.get('message');
	const email = cookies.get('email');
	const emailSent = cookies.get('emailSent');

	if (emailSent || email || success || message) {
		cookies.delete('emailSent');
		cookies.delete('email');
		cookies.delete('success');
		cookies.delete('message');
	}

	toast.pop();

	return {
		summaries: {
			list1: formData.get('documents1'),
			list2: formData.get('documents2')
		},
		success: success,
		message: message,
		email: email,
		emailSent: emailSent
	};
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const fname = data.get('fname');
		const mname = data.get('mname') || '';
		const lname = data.get('lname');
		const snum = data.get('snum');
		const email = data.get('email');
		const yearLevel = data.get('yearLevel');
		const isScholar = data.get('scholarship') ? true : false;
		const purpose = data.get('purpose');
		const requestForms = data.getAll('requestForms');
		const requestPrices = data.getAll('requestPrices');
		const totalPrice = data.get('totalPrice');
		const paymentMethod = data.get('paymentMethod');

		const name = fname + ' ' + mname + ' ' + lname;
		const validEmail = await validateEmail(email);

		cookies.set('email', email);

		if (validEmail[0].count >= 1) {
			cookies.set('success', false);
			cookies.set(
				'message',
				'<b>Error!</b> Your request has been declined: Email has a pending request.'
			);
			throw s_error(400, 'Email already exists');
		}

		const validSnum = await validateSnum(snum);

		if (validSnum[0].count >= 1) {
			cookies.set('success', false);
			cookies.set(
				'message',
				'<b>Error!</b> Your request has been declined: Student number has a pending request.'
			);
			throw s_error(400, 'Student number already exists.');
		}

		const date = new Date();
		const localdate =
			date.toLocaleDateString('fil-PH', { year: 'numeric' }) +
			'-' +
			date.toLocaleDateString('fil-PH', { month: '2-digit' }) +
			'-' +
			date.toLocaleDateString('fil-PH', { day: 'numeric' }) +
			'T' +
			date.toLocaleString('fil-PH', { hour: '2-digit', hour12: false }) +
			':' +
			date.toLocaleString('fil-PH', { minute: '2-digit' }) +
			':' +
			date.toLocaleString('fil-PH', { second: '2-digit' }) +
			'.' +
			date.getMilliseconds() +
			'Z';

		const user = await db_user.insert(usersTable).values({
			first_name: fname.toString(),
			middle_name: mname.toString(),
			last_name: lname.toString(),
			student_number: snum.toString(),
			email: email.toString(),
			year_level: yearLevel.toString(),
			is_scholar: isScholar,
			purpose: purpose,
			total_price: totalPrice,
			payment_method: paymentMethod.toString(),
			request_date: parseISOString(localdate)
		});

		const requests = requestForms.map((item, index) => ({
			document: item,
			price: requestPrices[index],
			userId: user.insertId
		}));

		const formRequest = await db_user.insert(requestsTable).values(requests);

		try {
			const pdf_response = await fetch('http://localhost:5173/api/generate-invoice', {
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
			const gen_pdf = await pdf_response.json();
			const req = getRequirements(requestForms);

			const email_response = await fetch('http://localhost:5173/api/email', {
				method: 'POST',
				body: JSON.stringify({
					subject: `Invoice for Request No. ${user.insertId}`,
					request_number: user.insertId,
					emailType: 'invoice',
					previewMsg: `Here's your invoice. Please upload requirement/s`,
					contentMsg:
						req.size > 0
							? `Attached document (pdf) is the invoice of your request. Please submit your requirement/s by clicking the button below. Thank you!`
							: `Attached document (pdf) is the invoice of your request. Please wait for the email regarding the approval of your request. Thank you!`,
					lname: lname,
					fname: fname,
					email: email,
					req: req.size,
					pdf: gen_pdf
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const emailSent = await email_response.json();
			if (emailSent.includes('250')) {
				cookies.set('emailSent', true);
			}
		} catch (error) {
			await db_user.delete(usersTable).where(eq(usersTable.id, user.insertId));
			await db_user.delete(requestsTable).where(eq(requestsTable.userId, user.insertId));
			cookies.set('emailSent', false);
			cookies.set('message', error.message);
			throw s_error(400, error.message);
		}

		cookies.set('success', true);
		cookies.set('message', '<b>Success!</b> Your request has been submitted.');
		throw redirect(303, '/request-forms?success=true');
	}
};
