import { db } from '$lib/server/db.js';
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

		await db.update(usersTable).set({ request_approved: true }).where(eq(usersTable.id, id));

		return { success: true };
		//send email
	},
	verify: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await db.update(usersTable).set({ documents_approved: true }).where(eq(usersTable.id, id));

		return { success: true };
		//send email
	},
	available: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await db.update(usersTable).set({ request_available: true }).where(eq(usersTable.id, id));

		return { success: true };
		//send email
	},
	finish: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await db.delete(usersTable).where(eq(usersTable.id, id));
		await db.delete(requestsTable).where(eq(requestsTable.userId, id));

		return { success: true };
		//send email
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const reason = data.get('reason');

		await db.delete(usersTable).where(eq(usersTable.id, id));
		await db.delete(requestsTable).where(eq(requestsTable.userId, id));

		return { success: true };
		// send email with reason
	}
};
