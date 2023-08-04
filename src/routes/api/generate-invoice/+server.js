import pdf from 'pdfjs/';
import { json } from '@sveltejs/kit';
import HelveticaBold from 'pdfjs/font/Helvetica-Bold.js';

export async function POST({ request, fetch }) {
	const data = await request.json();
	const scholarship = data.scholarship == 'true' ? 'Yes' : 'No';
	const doc = new pdf.Document({ padding: 40 });
	const pdf_template = await fetch('http://localhost:5173/src/lib/pdfs/invoice.pdf').then((res) =>
		res.arrayBuffer()
	);

	const invoice = new pdf.ExternalDocument(pdf_template);
	doc.setTemplate(invoice);

	function addText(textY, textWidth, textName) {
		doc
			.cell({
				x: 84 * pdf.mm,
				y: 841.896 - textY * pdf.mm,
				width: textWidth * pdf.mm,
				height: 7 * pdf.mm
			})
			.text(textName, { textAlign: 'left', fontSize: 14, lineHeight: 1 });
	}

	addText(59.32, 101, data.name);
	addText(67.25, 101, data.snum);
	addText(75.25, 48.22, data.date);
	doc
		.cell({
			x: 84 * pdf.mm,
			y: 841.896 - 83.26 * pdf.mm,
			width: 13.83 * pdf.mm,
			height: 7 * pdf.mm
		})
		.text(scholarship, { textAlign: 'left', fontSize: 14, lineHeight: 1 })
		.br()
		.br();

	const table = doc.table({
		widths: [25 * pdf.mm, null, 27.85 * pdf.mm],
		borderHorizontalWidths: function (i) {
			return i < 2 ? 1 : 0.1;
		},
		borderVerticalWidths: [0, 0.1, 0.1, 0],
		padding: 5
	});

	const th = table.header({ font: HelveticaBold, borderBottomWidth: 1 });
	th.cell('Quantity', { fontSize: 12 });
	th.cell('Description', { fontSize: 12 });
	th.cell('Unit Price', { textAlign: 'center', fontSize: 12 });

	function addRow(qty, desc, price) {
		const tr = table.row();
		tr.cell(qty.toString(), { fontSize: 10 });
		tr.cell(desc, { fontSize: 10 });
		tr.cell('PHP ' + price, { fontSize: 10 });
	}

	for (var i = 0; i < data.forms.length; i++) {
		addRow(1, data.forms[i], data.prices[i]);
	}

	const total = table.row();
	total.cell('TOTAL', { font: HelveticaBold, colspan: 2, textAlign: 'right' });
	total.cell('PHP ' + data.total_price, { font: HelveticaBold, fontSize: 10 });

	const buf = await doc.asBuffer();

	return json(buf);
}
