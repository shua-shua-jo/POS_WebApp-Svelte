import { generate } from '@pdfme/generator';

export async function generatePdf(pdf, data) {
	const template = {
		basePdf: await pdf.arrayBuffer(),
		schemas: [
			{
				name: {
					type: 'text',
					position: { x: 84, y: 59.32 },
					width: 101,
					height: 7,
					alignment: 'left',
					fontSize: 14,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				snum: {
					type: 'text',
					position: { x: 84, y: 67.25 },
					width: 47.43,
					height: 7,
					alignment: 'left',
					fontSize: 14,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				date: {
					type: 'text',
					position: { x: 84, y: 75.25 },
					width: 48.22,
					height: 7,
					alignment: 'left',
					fontSize: 14,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				scholarship: {
					type: 'text',
					position: { x: 84, y: 83.26 },
					width: 13.83,
					height: 7,
					alignment: 'left',
					fontSize: 14,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				qty: {
					type: 'text',
					position: { x: 24.26, y: 112 },
					width: 15.68,
					height: 5.15,
					alignment: 'center',
					fontSize: 11,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				desc: {
					type: 'text',
					position: { x: 49.74, y: 112 },
					width: 86.32,
					height: 5.15,
					alignment: 'left',
					fontSize: 11,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				},
				price: {
					type: 'text',
					position: { x: 150.02, y: 112 },
					width: 27.85,
					height: 5.15,
					alignment: 'center',
					fontSize: 11,
					characterSpacing: 0,
					lineHeight: 1,
					fontName: 'Roboto'
				}
			}
		]
	};
	const inputs = [
		{
			name: data.name,
			snum: data.snum,
			date: data.date,
			scholarship: data.isScholar,
			qty: '1',
			desc: data.forms[0],
			price: data.prices[0]
		}
	];

	const generated = await generate({ template, inputs });

	return generated.buffer;
}
