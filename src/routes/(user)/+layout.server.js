import path from 'path';

export const load = ({ cookies }) => {
	const id = cookies.get('userid');

	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}
};
