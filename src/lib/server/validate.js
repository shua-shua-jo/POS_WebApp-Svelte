import { eq } from 'drizzle-orm';
import { db } from './db.js';
import { usersTable } from './schema.js';
import { sql } from 'drizzle-orm';

export async function validateEmail(email) {
	return await db
		.select({ count: sql`count(1)` })
		.from(usersTable)
		.where(eq(usersTable.email, email));
}

export async function validateSnum(snum) {
	return await db
		.select({ count: sql`count(1)` })
		.from(usersTable)
		.where(eq(usersTable.student_number, snum));
}
