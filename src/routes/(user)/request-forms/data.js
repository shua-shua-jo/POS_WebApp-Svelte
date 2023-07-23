export const formData = new Map([
	[
		'documents1',
		[
			{
				'Honorable Dismissal': { price: 220, scholarship: false }
			},
			{ 'Certified True Text of Diploma': { price: 20, scholarship: false } },
			{ 'Diploma Translation': { price: 50, scholarship: false } },
			{ 'Certified True Copy of Diploma': { price: 220, scholarship: false } },
			{ 'Course Description': { price: 20, scholarship: false } },
			{ 'True Copy of Grades': { price: 50, scholarship: true } },
			{ 'Certificate of Enrollment': { price: 50, scholarship: true } },
			{ 'Transfer to Other UP Units': { price: 150, scholarship: false } },
			{ 'Certificate of Non-Issuance of ID': { price: 50, scholarship: true } },
			{ 'Official Transcript of Records': { price: 70, scholarship: false } }
		]
	],

	[
		'documents2',
		[
			{ 'Certificate of Graduation': { price: 50, scholarship: false } },
			{ 'Certificate of No Disciplinary Action': { price: 50, scholarship: true } },
			{ 'Certificate of No Contract': { price: 50, scholarship: false } },
			{ 'Certificate of Units Earned': { price: 50, scholarship: false } },
			{ 'Certificate of Medium of Instruction': { price: 50, scholarship: false } },
			{ 'Certificate of Grade Equivalence': { price: 50, scholarship: false } },
			{
				'Certificate of Non-Issuance of Honorable Dismissal for Graduates': {
					price: 50,
					scholarship: false
				}
			},
			{ 'Certificate of Non-Issuance of S.O. Number': { price: 50, scholarship: false } }
		]
	]
]);
