import { db } from '$lib/server/db.js';
import { eq, and } from 'drizzle-orm';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';

export async function load({ cookies, url }) {
	const token = cookies.get('auth_token');

	if (!token) {
		throw error(401, 'Unauthorized User');
	}

	const path = url.pathname.split('/');
	const length = path.length;
	const id = path[length - 1];

	const userData = async () => {
		return await db
			.select()
			.from(usersTable)
			.innerJoin(
				requestsTable,
				and(eq(usersTable.id, requestsTable.userId), eq(usersTable.id, id))
			);
	};

	return {
		user: userData()
	};
}
