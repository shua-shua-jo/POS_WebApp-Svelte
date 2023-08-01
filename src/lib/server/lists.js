export const requirements = new Map([
	[
		'Honorable Dismissal',
		[
			'Letter from parents stating the reason for Honorable Dismissal',
			'Signed letter stating the reason for Honorable Dismissal',
			'Latest University Clearance',
			'Exit counseling from the Office of Counseling and Guidance',
			'Official Transcript of Records'
		]
	],
	['Official Transcript of Records', 'Latest University Clearance'],
	['Certified True Text of Diploma', 'Affidavit of Loss'],
	['Diploma Translation', 'Scanned Copy of Diploma'],
	['Certified True Copy of Diploma', 'Scanned Copy of Diploma'],
	['True Copy of Grades', 'Preferred Format for True Copy of Grades'],
	['Certificate of Enrollment', 'Signed Form 5'],
	['Certificate of Non-Issuance of ID', 'Signed Form 5']
]);

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
