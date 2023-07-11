import { writable } from 'svelte/store';

export function titleCase(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ')
		.trim();
}

export function checkSnum() {
	if (this.value.length > this.maxLength) {
		this.value = this.value.slice(0, this.maxLength);
	}
}

const checkedForms = new Map();
export let totalPrice = writable(0);
export let summaryPrices = writable([]);
export function addPrice() {
	function sum() {
		totalPrice.set(
			[...checkedForms.values()].reduce((prevPrice, currPrice) => prevPrice + currPrice, 0)
		);
	}
	function pushPrice() {
		summaryPrices.set([...checkedForms.values()]);
	}
	if (this.checked) {
		checkedForms.set(this.value, parseInt(this.dataset.price));
		sum();
		pushPrice();
	} else {
		checkedForms.delete(this.value);
		sum();
		pushPrice();
	}
}

const base_values = {
	'Certificate of Enrollment': '50',
	'Certificate of No Disciplinary Action': '20',
	'True Copy of Grades': '50',
	'Certificate of Non-Issuance of ID': '50'
};

export function handleScholarship() {
	const hd = document.querySelector('input[value="Honorable Dismissal"]');
	const scholarship = document.querySelectorAll('input[data-isscholar="scholar"]');
	if (this.checked) {
		scholarship.forEach((el) => el.setAttribute('data-price', 0));
		hd.disabled = true;
	} else {
		console.log(base_values['Certificate of Enrollment']);
		scholarship.forEach((el) => el.setAttribute('data-price', base_values[el.value]));
		// scholarship.forEach((el) => el.setAttribute('data-price', base_values[el.value()]));
		hd.disabled = false;
	}
}

export function handleHonorableDismissal() {
	const sc = document.querySelector('input[name="scholarship"]');
	if (this.checked) {
		sc.disabled = true;
	} else {
		sc.disabled = false;
	}
}

export function handleSummaryPrice(form) {
	const sp = document.querySelector('input[value="' + form.toString() + '"]');
	console.log(sp);
}
