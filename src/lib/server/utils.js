import { requirements } from './lists.js';

export function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export function getRequirements(docs) {
	let req = [];
	for (var i = 0, n = docs.length; i < n; i++) {
		const required = requirements.get(docs[i].document);
		if (required) {
			if (required instanceof Array) {
				required.forEach((value) => {
					req.push(value);
				});
			} else {
				req.push(requirements.get(docs[i].document));
			}
		}
	}
	return [...new Set(req)];
}
