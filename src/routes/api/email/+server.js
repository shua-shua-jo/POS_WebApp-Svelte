import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import email_template from '$lib/emails/email_template.svelte';
import nodemailer from 'nodemailer';
import { EMAIL, APP_PASSWORD } from '$env/static/private';

export async function POST({ request, fetch }) {
	const data = await request.json();

	console.time('creating transporter');
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: EMAIL,
			pass: APP_PASSWORD
		}
	});
	console.timeEnd('creating transporter');

	console.time('rendering template');
	const emailHtml = render({
		template: email_template,
		props: {
			data: {
				emailType: data.emailType,
				emailId: data.emailId || null,
				name: data.fname,
				request_number: data.request_number,
				contentMsg: data.contentMsg,
				previewMsg: data.previewMsg,
				reason: data.reason || null,
				req: data.req || null
			}
		}
	});
	console.timeEnd('rendering template');

	let options;
	if (data.emailType == 'invoice' || data.emailType == 'receipt') {
		options = {
			from: 'up2go.test@gmail.com',
			to: data.email,
			subject: data.subject,
			html: emailHtml,
			attachments: [
				{
					filename: `${data.lname}_${data.emailType}`,
					content: new Buffer.from(data.pdf),
					contentType: 'application/pdf'
				}
			]
		};
	} else {
		options = {
			from: 'up2go.test@gmail.com',
			to: data.email,
			subject: data.subject,
			html: emailHtml
		};
	}

	console.time('sending email');
	const res = await transporter.sendMail(options);
	console.timeEnd('sending email');
	return json(res.response);
}
