import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('auth_token');

	if (token) {
		cookies.delete('auth_token');
	}

	throw redirect(303, '/admin/login');
}
