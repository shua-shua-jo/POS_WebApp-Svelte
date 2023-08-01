import { requirements } from './lists.js';

export function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export function getRequirements(docs) {
	let req = new Set();
	for (var i = 0, n = docs.length; i < n; i++) {
		const required = requirements.get(docs[i]);
		if (required) {
			if (required instanceof Array) {
				required.forEach((value) => {
					req.add(value);
				});
			} else {
				req.add(requirements.get(docs[i]));
			}
		}
	}
	return req;
}
