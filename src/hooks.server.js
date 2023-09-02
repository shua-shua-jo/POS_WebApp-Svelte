import { OUR_TOKEN } from '$env/static/private';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/login') {
		const token = event.cookies.get('auth_token', { path: '/admin' });
		if (!token || token !== OUR_TOKEN) {
			return new Response(null, {
				status: 301,
				headers: {
					location: '/admin/login'
				}
			});
		}
	}
	return await resolve(event);
}
