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

export function validateNames(evt) {
	const forbiddenChars = !/^[a-zA-Z ]*$/g.test(evt.key);
	if (forbiddenChars) {
		evt.preventDefault();
	}
}

export function checkSnum() {
	if (this.value.length <= this.maxLength) {
		return;
	}
	this.value = this.value.slice(0, this.maxLength);
}

export function validateSnum(evt) {
	const forbiddenChars = ['.', '-', '+', 'e', 'E'];
	const inputChar = evt.key;
	if (forbiddenChars.includes(inputChar)) {
		evt.preventDefault();
	}
}

const base_values = {
	'Certificate of Enrollment': '50',
	'Certificate of No Disciplinary Action': '20',
	'True Copy of Grades': '50',
	'Certificate of Non-Issuance of ID': '50'
};

const honorable_dismissal_prices = {
	'First Year': '220',
	'Second Year': '220',
	'Third Year': '290',
	'Fourth Year': '360',
	Alumni: '360',
	Graduate: '430'
};

const course_description_prices = {
	'First Year': '20',
	'Second Year': '40',
	'Third Year': '60',
	'Fourth Year': '80',
	Alumni: '80'
};

const otr_prices = {
	'First Year': '70',
	'Second Year': '70',
	'Third Year': '140',
	'Fourth Year': '210',
	Alumni: '210',
	Graduate: '280'
};

const checkedForms = new Map();
export let totalPrice = writable(0);
export let summaryPrices = writable(new Map());
export function updatePrice() {
	const checkboxForms = document.querySelectorAll('input.request-forms');
	function sum() {
		totalPrice.set(
			[...checkedForms.values()].reduce((prevPrice, currPrice) => prevPrice + currPrice, 0)
		);
	}
	function pushPrice() {
		summaryPrices.set(checkedForms);
	}
	checkboxForms.forEach((el) => {
		if (el.checked) {
			checkedForms.set(el.value, parseInt(el.dataset.price));
			sum();
			pushPrice();
		} else {
			checkedForms.delete(el.value);
			sum();
			pushPrice();
		}
	});
}

export function handleYearLevel(yearlvl) {
	const hd = document.querySelector('input[id="Honorable Dismissal"]');
	const cd = document.querySelector('input[id="Course Description"]');
	const otr = document.querySelector('input[id="Official Transcript of Records"]');

	const hd_price = honorable_dismissal_prices[yearlvl];
	const otr_price = otr_prices[yearlvl];

	// change Honorable Dismissal price
	hd.dataset.price = hd_price;
	updateFormPriceLabel(hd.value, hd_price);
	// change OTR price
	otr.dataset.price = otr_price;
	updateFormPriceLabel(otr.value, otr_price);
	if (yearlvl !== 'Graduate') {
		cd.disabled = false;
		// change Course Description price
		const cd_price = course_description_prices[yearlvl];
		cd.dataset.price = cd_price;
		updateFormPriceLabel(cd.value, cd_price);
	} else {
		cd.disabled = true;
	}
	updatePrice();
}

export function handleScholarship() {
	const hd = document.querySelector('input[id="Honorable Dismissal"]');
	const scholarship = document.querySelectorAll('input[data-isscholar="scholar"]');
	if (this.checked) {
		hd.disabled = true;
		scholarship.forEach((el) => {
			el.setAttribute('data-price', 0);
			updateFormPriceLabel(el.value, 0);
		});
	} else {
		hd.disabled = false;
		scholarship.forEach((el) => {
			el.setAttribute('data-price', base_values[el.id]);
			updateFormPriceLabel(el.value, base_values[el.id]);
		});
	}
	updatePrice();
}

export function handleChecked(name, evt) {
	const sc = document.querySelector('input[name="scholarship"]');
	const opt = document.querySelector('option[value="Graduate"]');
	if (evt.checked) {
		if (name == 'Honorable Dismissal') {
			sc.disabled = true;
		}
		if (name == 'Course Description') {
			opt.disabled = true;
		}
	} else {
		if (name == 'Honorable Dismissal') {
			sc.disabled = false;
		}
		if (name == 'Course Description') {
			opt.disabled = false;
		}
	}
}

function updateFormPriceLabel(dataVal, newPrice) {
	const pricelbl = document.querySelector('[data-value="' + dataVal + '"]');
	pricelbl.textContent = newPrice;
}

export function handleAtLeastCheckedOne(evt) {
	evt.preventDefault();
	const checkboxes = document.querySelectorAll('input.request-forms:checked');
	const errorMessage = 'At least one form must be selected.';
	const checkbox = document.querySelector('input.request-forms');
	if (checkboxes.length == 0) {
		checkbox.setCustomValidity(errorMessage);
	} else {
		checkbox.setCustomValidity('');
	}
}

export function handleNextButton() {}
export function handlePrevButton() {}
