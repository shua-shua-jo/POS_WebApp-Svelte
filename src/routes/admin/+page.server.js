import { redirect } from '@sveltejs/kit';
import { OUR_TOKEN } from '$env/static/private';

export const load = async ({ cookies }) => {
	const token = cookies.get('auth_token');
	const login = cookies.get('admin-login');

	if (!token || token !== OUR_TOKEN) {
		throw redirect(301, '/admin/login');
	}
	if (login && login === 'success') {
		cookies.delete('admin-login', { path: '/admin' });
		return {
			login: login
		};
	}
};
