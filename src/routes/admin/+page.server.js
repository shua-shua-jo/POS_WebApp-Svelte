export const load = async ({ cookies }) => {
	const login = cookies.get('admin-login');

	if (login && login === 'success') {
		cookies.delete('admin-login', { path: '/admin' });
		return {
			login: login
		};
	}
};
