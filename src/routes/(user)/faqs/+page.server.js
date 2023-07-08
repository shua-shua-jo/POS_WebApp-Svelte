import { queries } from './queries.js';

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		faqs: queries.map((faq) => ({
			label: faq.label ? faq.label : 'Label Missing',
			contents: faq.contents ? faq.contents : 'Content Missing'
		}))
	};
}
