import { db } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { toast } from '@zerodevx/svelte-toast';

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
