import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import email_template from '$lib/emails/email_template.svelte';
import nodemailer from 'nodemailer';
import { EMAIL, APP_PASSWORD } from '$env/static/private';

export async function POST({ request }) {
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
				name: data.fname,
				request_number: data.request_number
			}
		}
	});
	console.timeEnd('rendering template');

	const options = {
		from: 'up2go.test@gmail.com',
		to: 'joshuaabello02@gmail.com',
		subject: data.subject,
		html: emailHtml
	};

	console.time('sending email');
	const res = await transporter.sendMail(options);
	console.timeEnd('sending email');
	return json(res.response);
}
