import { formData } from './data.js';

export function load({ cookies }) {
	const id = cookies.get('userid');
	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}
	return {
		summaries: {
			list1: formData.get('documents1'),
			list2: formData.get('documents2')
		}
	};
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const fname = data.get('fname');
		const mname = data.get('mname') ? data.get('mname') : '';
		const lname = data.get('lname');
		const snum = data.get('snum');
		const email = data.get('email');
		const yearLevel = data.get('yearLevel');
		const isScholar = data.get('scholarship') ? true : false;
		const requestForms = data.getAll('requestForms');
		const paymentMethod = data.get('paymentMethod');

		console.log('First Name: ', fname);
		console.log('Middle Name: ', mname);
		console.log('Last Name: ', lname);
		console.log('Student Number: ', snum);
		console.log('Email: ', email);
		console.log('Year Level: ', yearLevel);
		console.log('Scholar: ', isScholar);
		console.log('Request Forms: ', requestForms);
		console.log('Payment Method: ', paymentMethod);
	}
};
