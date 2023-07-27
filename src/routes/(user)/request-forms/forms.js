import { writable } from 'svelte/store';

export function handleNames(evt) {
	const valid = validateNames(evt.key);
	if (!valid) {
		evt.preventDefault();
	}
}
export function validateText(text) {
	return /^[A-Za-z\d\x28\x29\x2C-\x2F\x3A ]+$/g.test(text);
}
export function validateNames(text) {
	return /^[a-zA-Z ]*$/g.test(text);
}

export function handleSnum(evt) {
	if (evt.key == 'Tab' || evt.key == 'Enter' || evt.key == 'Alt' || evt.key == 'Control') {
		return;
	}
	const forbiddenChars = !/^[\d]*$/g.test(evt.key);
	if (forbiddenChars) {
		evt.preventDefault();
	}
}

export function validateSnum(snum) {
	const currentYear = new Date().getFullYear();
	return (
		snum.length == 9 &&
		/^[\d]*$/g.test(snum) &&
		snum.substring(0, 2) == '20' &&
		parseInt(snum.substring(0, 4)) <= currentYear
	);
}

export function validateEmail(email) {
	return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
}

const base_values = {
	'Certificate of Enrollment': '50',
	'Certificate of No Disciplinary Action': '20',
	'True Copy of Grades': '50',
	'Certificate of Non-Issuance of ID': '50'
};

const honorable_dismissal_prices = new Map([
	['First Year', '220'],
	['Second Year', '220'],
	['Third Year', '290'],
	['Fourth Year', '360'],
	['Alumni', '360'],
	['Graduate', '430']
]);

const course_description_prices = new Map([
	['First Year', '20'],
	['Second Year', '40'],
	['Third Year', '60'],
	['Fourth Year', '80'],
	['Alumni', '80']
]);

const otr_prices = new Map([
	['First Year', '70'],
	['Second Year', '70'],
	['Third Year', '140'],
	['Fourth Year', '210'],
	['Alumni', '210'],
	['Graduate', '280']
]);

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

let hd_temp_price;
let cd_temp_price;
export function handleYearLevel(yearlvl) {
	const hd = document.querySelector('input[id="Honorable Dismissal"]');
	const cd = document.querySelector('input[id="Course Description"]');
	const cd_label = cd.nextElementSibling;
	const cd_price_lbl = cd_label.nextElementSibling;
	const otr = document.querySelector('input[id="Official Transcript of Records"]');
	const hd_span = document.querySelector('[data-value="Honorable Dismissal"]');
	const cd_span = document.querySelector('[data-value="Course Description"]');

	const hd_price = honorable_dismissal_prices.get(yearlvl);
	const otr_price = otr_prices.get(yearlvl);

	// change Honorable Dismissal price
	hd.dataset.price = hd_price;
	if (hd_span) {
		updateFormPriceLabel(hd.value, hd_price);
	}
	hd_temp_price = hd_price;
	// change OTR price
	otr.dataset.price = otr_price;
	updateFormPriceLabel(otr.value, otr_price);
	if (yearlvl !== 'Graduate') {
		cd.disabled = false;
		// change Course Description price
		const cd_price = course_description_prices.get(yearlvl);
		if (cd_span == null) {
			cd_price_lbl.innerHTML = `<div>PHP <span data-value="Course Description">${cd_price}</span>.00</div>`;
		}
		cd.dataset.price = cd_price;
		if (cd_span) {
			updateFormPriceLabel(cd.value, cd_price);
		}
	} else {
		cd.disabled = true;
		cd_price_lbl.textContent = 'Inaccessible for Graduate';
	}
	updatePrice();
}

export function handleScholarship() {
	const hd = document.getElementById('Honorable Dismissal');
	const hd_label = hd.nextElementSibling;
	const hd_price = hd_label.nextElementSibling;
	const scholarship = document.querySelectorAll('input[data-isscholar="scholar"]');
	const span = document.querySelector('[data-value="Honorable Dismissal"]');
	if (this.checked) {
		hd.disabled = true;
		hd_temp_price = span.textContent;
		hd_price.textContent = 'Inaccessible for Scholarship';
		scholarship.forEach((el) => {
			el.setAttribute('data-price', 0);
			updateFormPriceLabel(el.value, 0);
		});
	} else {
		hd.disabled = false;
		hd_price.innerHTML = `<div>PHP <span data-value="Honorable Dismissal">${hd_temp_price}</span>.00</div>`;
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

function handleFirstStep() {
	let snumValid = false;
	let namesValidNum = 0;
	const inputNames = document.querySelectorAll('input[type="text"]:required');

	for (var i = 0, len = inputNames.length; i < len; i++) {
		if (inputNames[i].name == 'snum') {
			const snum = inputNames[i].value.trim();
			snumValid = validateSnum(snum);
		} else {
			const value = inputNames[i].value.trim();
			if (inputNames[i].name == 'purpose') {
				if (value.length == 0 || !validateText(value)) {
					continue;
				}
				namesValidNum++;
			} else {
				if (value.length == 0 || !validateNames(value)) {
					continue;
				}
				namesValidNum++;
			}
		}
	}

	const email = document.querySelector('input[type="email"]');
	const emailValid = validateEmail(email.value.trim());

	const yearLvl = document.querySelector('select[name="yearLevel"]');
	const yearLvlValid = yearLvl.value !== '';

	if (snumValid && namesValidNum == 3 && emailValid && yearLvlValid) {
		return true;
	} else {
		return false;
	}
}

function handleSecondStep() {
	const checkboxes = document.querySelectorAll('input.request-forms:checked');
	const errorMessage = 'At least one form must be selected.';
	const checkbox = document.querySelector('input.request-forms');
	if (checkboxes.length !== 0) {
		checkbox.setCustomValidity('');
		return true;
	}
	checkbox.setCustomValidity(errorMessage);
	return false;
}

function handleThirdStep() {
	const paymentMethod = document.querySelector('input[type=radio]:checked');
	if (paymentMethod !== null) {
		return true;
	}
	return false;
}

export let progressNum = writable(1);

export function handleNextButton(progNum) {
	if (progNum >= 4) {
		return;
	}

	if (progNum == 1) {
		const next = handleFirstStep();
		if (!next) {
			return;
		}
	} else if (progNum == 2) {
		const next = handleSecondStep();
		if (!next) {
			return;
		}
	} else if (progNum == 3) {
		const next = handleThirdStep();
		if (!next) {
			return;
		}
	}
	progressNum.set(progNum + 1, 0);
}
export function handlePrevButton(progNum) {
	if (!(progNum <= 4 && progNum > 1)) {
		return;
	}
	progressNum.set(progNum - 1, 0);
}

export function handleSubmit() {
	if (!handleFirstStep || !handleSecondStep || !handleThirdStep) {
		return false;
	}
	return true;
}
