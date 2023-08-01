export async function load({ cookies }) {
	const id = cookies.get('userid');
	const req_error = cookies.get('req-error');
	let req_message;
	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}
	if (req_error) {
		req_message = req_error;
		cookies.delete('req-error');
	}

	return { req_message: req_message };
}
