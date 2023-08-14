import { db_user } from '$lib/server/db.js';
import { eq } from 'drizzle-orm';
import { usersTable, requestsTable, requirementsTable, paymentsTable } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { toast } from '@zerodevx/svelte-toast';

export async function load({ cookies, params, fetch }) {
	const token = cookies.get('auth_token');

	if (!token) {
		throw error(401, 'Unauthorized User');
	}

	toast.pop();

	const data = await db_user
		.select()
		.from(usersTable)
		.leftJoin(requestsTable, eq(requestsTable.userId, usersTable.id))
		.leftJoin(requirementsTable, eq(requirementsTable.userId, usersTable.id))
		.leftJoin(paymentsTable, eq(paymentsTable.userId, usersTable.id))
		.where(eq(usersTable.id, params.userId));

	let request = new Set(),
		requirement = new Set();

	for (var i = 0, n = data.length; i < n; i++) {
		request.add(JSON.stringify(data[i].requestsTable));
		if (data[i].requirementsTable == null) {
			continue;
		}
		requirement.add(JSON.stringify(data[i].requirementsTable));
		if (data[i].paymentsTable == null) {
			continue;
		}
	}

	const userData = data[0].usersTable;

	let requestData = [];
	for (const value of request) {
		requestData.push(JSON.parse(value));
	}

	let requirementData = [];
	if (requirement.size > 0) {
		for (const value of requirement) {
			requirementData.push(JSON.parse(value));
		}
	}
	requirementData.sort((a, b) => {
		if (a.id < b.id) {
			return -1;
		} else if (a.id > b.id) {
			return 1;
		}
		return 0;
	});

	const paymentData = data[0].paymentsTable;

	let pdfReqs = [];
	for (const req of requirementData) {
		if (req.file_name !== null) {
			const reqDatePath = req.upload_date.split('T')[0];
			// const value = await fetch(
			// 	`http://localhost:5173/requirements/${reqDatePath}/${req.userId}/${req.file_name}`
			// );
			// const arrayBuf = await value.arrayBuffer();
			// const buf = Buffer.from(arrayBuf);
			// const blob = new Blob([buf], { type: 'application/pdf' });
			// const url = URL.createObjectURL(blob);
			// pdfReqs.push({ req_type: req.requirement_type, pdf_name: req.file_name, url: url });
			pdfReqs.push({
				id: req.id,
				req_type: req.requirement_type,
				pdf_name: req.file_name,
				url: `http://localhost:5173/requirements/${reqDatePath}/${req.userId}/${req.file_name}`
			});
		}
	}
	return {
		user: userData,
		request: requestData,
		requirement: requirementData,
		payment: paymentData,
		pdfReqs: pdfReqs
	};
}
