import { queries } from '$lib/server/queries.js';

export function load() {
	return {
		faqs: queries.map((faq) => ({
			label: faq.label ? faq.label : 'Label Missing',
			contents: faq.contents ? faq.contents : 'Content Missing'
		}))
	};
}
