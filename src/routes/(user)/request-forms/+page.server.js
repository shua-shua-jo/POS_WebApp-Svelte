import { formData } from './data.js';
import { toast } from '@zerodevx/svelte-toast';
import { redirect, error } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { validateEmail, validateSnum } from '$lib/server/validate.js';
import { parseISOString } from '$lib/server/utils.js';

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
			cookies.set('message', 'Error! Your request has been declined: Email has a pending request.');
			throw error(400, '?request-forms?success=false');
		}

		const validSnum = await validateSnum(snum);

		if (validSnum[0].count >= 1) {
			cookies.set('success', false);
			cookies.set(
				'message',
				'Error! Your request has been declined: Student number has a pending request.'
			);
			throw error(400, '?request-forms?success=false');
		}

		const date = new Date();
		const localdate =
			date.getFullYear() +
			'-' +
			('0' + (date.getMonth() + 1)).slice(-2) +
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

		const user = await db.insert(usersTable).values({
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

		console.log(user.time);

		const requests = requestForms.map((item, index) => ({
			document: item,
			price: requestPrices[index],
			userId: user.insertId
		}));

		const formRequest = await db.insert(requestsTable).values(requests);

		console.log(formRequest.time);
		try {
			const response = await fetch('http://localhost:5173/api/email', {
				method: 'POST',
				body: JSON.stringify({
					subject: `Invoice for Request No. ${user.insertId}`,
					request_number: user.insertId,
					emailType: 'invoice',
					name: name,
					lname: lname,
					fname: fname,
					email: email,
					snum: snum,
					isScholar: isScholar,
					forms: requestForms,
					prices: requestPrices
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const emailSent = await response.json();
			if (emailSent.includes('250')) {
				console.log('Email sent!');
				cookies.set('emailSent', true);
			} else {
				console.log('Email not sent!');
				cookies.set('emailSent', false);
			}
		} catch (error) {
			console.log(error);
		}

		cookies.set('success', true);
		cookies.set('message', 'Success! Your request has been submitted.');
		throw redirect(303, '/request-forms?success=true');
	}
};
