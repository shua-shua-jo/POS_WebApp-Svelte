export async function POST({ cookies, request }) {
	const token = cookies.get('auth_token');

	if (token) {
		cookies.delete('auth_token');
	}
}
