import { formData, basePrices } from './data.js';

export function load() {
	return {
		summaries: {
			list1: formData.get('documents1'),
			list2: formData.get('documents2'),
			priceMap: basePrices
		}
	};
}
