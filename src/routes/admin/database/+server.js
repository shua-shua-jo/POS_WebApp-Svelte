import { json, error } from '@sveltejs/kit';
import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';

export async function GET({ cookies }) {
	const token = cookies.get('auth_token');

	if (!token) {
		throw error(401, 'Unauthorized User');
	}
	const usersData = await db_user.select().from(usersTable);

	const requestsData = await db_user.select().from(requestsTable);

	return json({
		usersData: usersData,
		requestsData: requestsData
	});
}
