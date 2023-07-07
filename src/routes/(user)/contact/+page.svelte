<script>
	import email_icn from '$lib/images/icons/email.png';
	import phone_icn from '$lib/images/icons/phone.png';
	import bg_upb from '$lib/images/bg/bg-upb2.jpg';
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('.contact-section').style.backgroundImage = 'url(' + bg_upb + ')';
	});
</script>

<svelte:head>
	<title>UP2GO: Contact Us</title>
</svelte:head>

<section class="contact-section">
	<div class="contact-container">
		<div class="contact-title">
			<h1>CONTACT US</h1>
		</div>
		<div class="contact-line-container">
			<div class="contact-line" />
		</div>
		<div class="contact-content">
			<h1>Office of the University Registrar</h1>
			<p>
				University of the Philippines Baguio <br />
				Governor Pack Rd., Baguio City <br />
				Benguet, Philippines 2600
			</p>
		</div>
		<div class="contact-details">
			<table>
				<tr>
					<td class="label"><img alt="Phone Icon" src={phone_icn} /></td>
					<td class="label-title">(074) 444-8806</td>
				</tr>
				<tr>
					<td class="label"><img alt="Email Icon" src={email_icn} /></td>
					<td class="label-title">our.upbaguio@gmail.com</td>
				</tr>
			</table>
		</div>
	</div>
</section>

<style>
	:global(body) {
		overflow-x: hidden;
		overflow-y: hidden;
	}

	@media (width <= 1396px) {
		:global(body) {
			overflow-x: auto;
			overflow-y: auto;
		}
	}
	@media (width <= 605px) {
		.contact-section {
			background-image: none !important;
		}
	}
	.contact-section {
		background-repeat: no-repeat;
		background-position: left;
		background-size: 60%;
		background-color: #fdfdfd;
		height: 100vh;
	}

	.contact-container {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		margin: 70px 0 0 0;
		width: 40%;
		float: right;
		background-color: #fdfdfd;
		padding: 125px 50px;
	}

	.contact-container .contact-title h1 {
		font-size: 30px;
		font-weight: 800;
		letter-spacing: 5px;
		color: #000;
	}

	.contact-container .contact-line-container .contact-line {
		width: 180px;
		height: 0px;
		background-color: #850038;
		border: 3px solid #850038;
		margin: 15px 0px 50px 0px;
	}

	.contact-container .contact-content h1 {
		font-size: 25px;
		font-weight: 600;
		color: #000;
		margin-bottom: 10px;
	}

	.contact-container .contact-content p {
		font-size: 20px;
		font-weight: 500;
		color: #000;
		margin-bottom: 50px;
	}

	.contact-container .contact-details .label img {
		width: 40px;
		margin-top: 5px;
	}

	.contact-container .contact-details .label-title {
		font-size: 20px;
		font-weight: 700;
		color: #000;
		margin-bottom: 10px;
	}

	.contact-container .contact-details tr td:first-child {
		padding-right: 20px;
	}

	.contact-container .contact-details tr td {
		padding: 5px;
	}
</style>
