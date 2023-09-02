import bcrypt from 'bcrypt';
import { db_user } from '$lib/server/db.js';
import { adminTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { OUR_TOKEN } from '$env/static/private';

export async function load({ cookies }) {
	const token = cookies.get('auth_token');

	if (token && token === OUR_TOKEN) {
		throw redirect(301, '/admin');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const keepLogin = data.get('keepLogin') ? true : false;

		const trimmedPass = password.trim().toLowerCase();
		if (
			trimmedPass == '' ||
			trimmedPass.includes('select') ||
			trimmedPass.includes('from') ||
			trimmedPass.includes('update')
		) {
			return fail(400, { message: 'Password is not valid' });
		}

		const admin = await db_user
			.select({ email: adminTable.email, password: adminTable.password })
			.from(adminTable)
			.where(eq(adminTable.email, email));

		if (admin.length == 0) {
			return fail(400, { message: 'Email does not exists.' });
		}

		const passwordIsRight = await bcrypt.compare(password, admin[0].password);

		if (!passwordIsRight) {
			return fail(400, { message: 'Password is wrong.' });
		}

		console.log(keepLogin);
		cookies.set('auth_token', OUR_TOKEN, {
			path: '/admin',
			httpOnly: true,
			secure: true,
			maxAge: keepLogin ? 60 * 60 * 24 * 7 : null
		});

		cookies.set('admin-login', 'success', {
			path: '/admin',
			httpOnly: true,
			secure: true
		});

		throw redirect(303, '/admin?login=success');
	}
};
