import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { toast } from '@zerodevx/svelte-toast';
import { eq } from 'drizzle-orm';

export const load = async ({ cookies, fetch }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		throw error(401, 'Unauthorized User');
	}

	const response = await fetch('/admin/database');

	if (response.ok) {
		const data = await response.json();
		toast.pop();
		return {
			usersData: data.usersData,
			requestsData: data.requestsData
		};
	} else {
		throw error(response.status, 'Request Failed');
	}
};

export const actions = {
	approve: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_approved: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('http://localhost:5173/api/email', {
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
	verify: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ documents_approved: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('http://localhost:5173/api/email', {
			method: 'POST',
			body: JSON.stringify({
				subject: `Requirements Verified for Request No. ${id}`,
				request_number: id,
				emailType: 'verify',
				previewMsg: `Your request has been approved.`,
				contentMsg: `This email is to inform you that your requirements has been verified by the OUR. Please process your payment for your request/s. Then, you can upload your proof of payment by scanning the attached qr code or by clicking the button below. Thank you!`,
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
	paid: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_paid: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('http://localhost:5173/api/email', {
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
	available: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');

		await db_user.update(usersTable).set({ request_available: true }).where(eq(usersTable.id, id));

		const email_response = await fetch('http://localhost:5173/api/email', {
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
		//send email
	},
	finish: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await db_user.delete(usersTable).where(eq(usersTable.id, id));
		await db_user.delete(requestsTable).where(eq(requestsTable.userId, id));

		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const fname = data.get('fname');
		const email = data.get('email');
		const reason = data.get('reason');

		await db_user.delete(usersTable).where(eq(usersTable.id, id));
		await db_user.delete(requestsTable).where(eq(requestsTable.userId, id));

		const email_response = await fetch('http://localhost:5173/api/email', {
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
		const emailSent = await email_response.json();

		return { success: true };
		// send email with reason
	}
};
