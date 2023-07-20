import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		throw redirect(301, '/admin/login');
	}
};
