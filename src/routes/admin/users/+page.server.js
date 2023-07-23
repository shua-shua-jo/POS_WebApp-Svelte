import { db } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';

export const load = async ({}) => {
	const usersData = async () => {
		return await db.select().from(usersTable);
	};
	const requestsData = async () => {
		return await db.select().from(requestsTable);
	};
	return {
		usersData: usersData(),
		requestsData: requestsData()
	};
};
