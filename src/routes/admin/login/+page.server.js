import bcrypt from 'bcrypt';
import { db } from '$lib/server/db.js';
import { adminTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('auth_token');

	if (token && token !== '') {
		throw redirect(301, '/admin/dashboard');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (password.trim() == '') {
			throw error(400, 'Password is not valid');
		}

		const admin = await db
			.select({ email: adminTable.email, password: adminTable.password })
			.from(adminTable)
			.where(eq(adminTable.email, email));

		if (admin.length == 0) {
			throw error(400, 'Email does not exists.');
		}

		const passwordIsRight = await bcrypt.compare(password, admin[0].password);

		if (!passwordIsRight) {
			throw error(400, 'Password is wrong.');
		}

		cookies.set('auth_token', 'token', {
			path: '/admin',
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});

		throw redirect(303, '/admin/dashboard?login=success');
	}
};
