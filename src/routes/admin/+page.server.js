import { redirect } from '@sveltejs/kit';
import { db_user } from '$lib/server/db.js';
import { usersTable, requestsTable } from '$lib/server/schema.js';
import { parseISOString } from '$lib/server/utils.js';
import { formData } from '$lib/server/lists.js';
import { eq } from 'drizzle-orm';

export const load = async ({ cookies }) => {
	const token = cookies.get('auth_token');

	if (!token) {
		throw redirect(301, '/admin/login');
	}
};

// delete later
const year_level = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Graduate', 'Alumni'];

function generateName() {
	return (Math.random() + 1).toString(36).substring(5);
}
function generateEmail() {
	const e = (Math.random() + 1).toString(36).substring(5);
	return e + '@' + e + '.com';
}
function generateSnum() {
	return 20000000 + Math.floor(Math.random() * 90000) + 10000;
}
function generateDate() {
	const date = new Date();
	const localdate =
		date.toLocaleDateString('fil-PH', { year: 'numeric' }) +
		'-' +
		date.toLocaleDateString('fil-PH', { month: '2-digit' }) +
		'-' +
		date.toLocaleDateString('fil-PH', { day: 'numeric' }) +
		'T' +
		date.toLocaleString('fil-PH', { hour: '2-digit', hour12: false }) +
		':' +
		date.toLocaleString('fil-PH', { minute: '2-digit' }) +
		':' +
		date.toLocaleString('fil-PH', { second: '2-digit' }) +
		'.' +
		date.getMilliseconds() +
		'Z';
	return parseISOString(localdate);
}

function generateForms() {
	const doc1 = formData.get('documents1');
	const doc2 = formData.get('documents2');
	const docs = doc1.concat(doc2);

	let requestForms = [];
	let requestPrices = [];
	const numOfIter = Math.floor(Math.random() * docs.length + 1);
	for (var i = 0; i < numOfIter; i++) {
		requestForms.push(Object.keys(docs[i]));
		requestPrices.push(Object.values(docs[i])[0].price);
	}
	return { requestForms, requestPrices };
}

function generateTotalPrice(arr) {
	return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export const actions = {
	dummy: async ({ request }) => {
		const data = await request.formData();
		const num = data.get('num');

		for (var i = 0; i < num; i++) {
			const { requestForms, requestPrices } = generateForms();

			const user = await db_user.insert(usersTable).values({
				first_name: generateName(),
				middle_name: Math.random() < 0.5 ? generateName() : '',
				last_name: generateName(),
				student_number: generateSnum(),
				email: generateEmail(),
				year_level: year_level[Math.floor(Math.random() * year_level.length)],
				is_scholar: Math.random() < 0.5 ? true : false,
				purpose: generateName(),
				total_price: generateTotalPrice(requestPrices),
				payment_method: Math.random() < 0.5 ? 'Cash' : 'Online',
				request_date: generateDate()
			});

			const requests = requestForms.map((item, index) => ({
				document: item,
				price: requestPrices[index],
				userId: user.insertId
			}));

			const formRequest = await db_user.insert(requestsTable).values(requests);
		}
	}
};
