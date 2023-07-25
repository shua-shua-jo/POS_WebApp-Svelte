export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin')) {
		event.locals.admin = 42;
	}
	return await resolve(event);
}
