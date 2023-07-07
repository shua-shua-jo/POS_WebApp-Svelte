import { queries } from './queries.js';

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		faqs: queries.map((faq) => ({
			label: faq.label,
			contents: faq.contents
		}))
	};
}
