import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import email_template from '$lib/emails/email_template.svelte';
import nodemailer from 'nodemailer';
import { EMAIL, APP_PASSWORD } from '$env/static/private';

export async function POST({ request }) {
	const { name } = await request.json();

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: EMAIL,
			pass: APP_PASSWORD
		}
	});

	const emailHtml = render({
		template: email_template,
		props: {
			name: 'me'
		}
	});

	const options = {
		from: 'joshuaabello200@gmail.com',
		to: 'edabello@up.edu.ph',
		subject: 'Test Mail',
		html: emailHtml
	};

	const { res } = await transporter.sendMail(options);

	return json(name + '@up.edu.ph');
}
