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
		port: 587,
		secure: false,
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
			emailType: 'invoice',
			name: data.fname
		}
	});
	console.timeEnd('rendering template');

	const options = {
		from: 'up2go.test@gmail.com',
		to: data.email,
		subject: 'Test Mail',
		html: emailHtml
	};

	console.time('sending email');
	const res = await transporter.sendMail(options);
	console.timeEnd('sending email');

	return json(res.accepted);
}
