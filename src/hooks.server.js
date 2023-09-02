import { OUR_TOKEN } from '$env/static/private';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/login') {
		const auth_token = event.cookies.get('auth_token', { path: '/admin' });
		const isAuth = !auth_token || auth_token !== OUR_TOKEN;
		if (isAuth) {
			return new Response(null, {
				status: 303,
				headers: {
					location: '/admin/login'
				}
			});
		}
	}
	return await resolve(event);
}
