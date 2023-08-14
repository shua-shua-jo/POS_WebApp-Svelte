<script>
	import { onMount } from 'svelte';
	import { success } from '$lib/toast/themes.js';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import up2go_colored from '$lib/images/logos/up2go-colored.png';

	export let data;

	let confirm = false;

	onMount(async () => {
		if (!data.upload) {
			const message = data.message;
			if (message == undefined) return;
			await success(message);
		}
	});
</script>

<svelte:head>
	<title>UP2GO: Payment Confirmation</title>
</svelte:head>
<SvelteToast options={{ duration: 3000 }} />

<div class="image-wrapper">
	<img src={up2go_colored} alt="UP2Go Colored Logo" />
</div>

{#if data.upload}
	<h2 class="header">Upload Proof of Payment Here</h2>
	<div class="container">
		<div class="wrapper">
			<form method="POST" enctype="multipart/form-data">
				<div class="user-info">
					{#each data.userData as data}
						<p><b>Request No. </b>{data.id}</p>
						<p><b>Name: </b>{data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</p>
						<p><b>Student Number: </b>{data.student_number}</p>
						<p><b>Year Level: </b>{data.year_level}</p>
						<p><b>Total Price: </b>PHP {data.total_price}.00</p>
					{/each}
				</div>
				<input type="file" name="payment" id="payment" accept="image/*,.pdf" required />
				<div class="confirm-container">
					<input class="confirm" type="checkbox" id="confirm" bind:checked={confirm} />
					<label class="confirm_lbl" for="confirm">I am done reviewing my uploaded files</label>
				</div>
				<input type="hidden" name="id" value={data.id} />
				<button disabled={!confirm}>Confirm Payment</button>
			</form>
		</div>
	</div>
{:else}
	<h1>Thank you for confirming your payment!</h1>
	<a class="back-to-home" href="/">Back to Home</a>
{/if}

<style>
	h1 {
		text-align: center;
	}
	.user-info p {
		display: flex;
		justify-content: space-between;
		padding: 1em 0;
		border-bottom: 1px solid black;
	}
	.back-to-home {
		display: block;
		text-align: center;
		border-radius: 5px;
		font-weight: bold;
		width: max-content;
		color: white;
		margin: 0 auto;
		margin-top: 2em;
		background-color: var(--blue_accent);
		padding: 0.5em 1em;
	}
	.back-to-home:hover {
		scale: 0.97;
	}
	.image-wrapper {
		user-select: none;
		width: 250px;
		margin: 2em auto 0 auto;
	}
	img {
		width: 100%;
		height: auto;
	}
	.header {
		position: relative;
		text-transform: uppercase;
		text-align: center;
		margin: 1em 0 2em 0;
	}
	.header::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: -0.5em;
		width: 30vw;
		height: 5px;
		background-color: var(--upcolor_maroon);
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11pt;
	}
	.wrapper {
		width: 30dvw;
	}
	.wrapper div {
		margin-bottom: 1.5em;
	}
	.wrapper input {
		width: auto;
	}
	.wrapper div input[type='file'] {
		font-weight: bold;
		color: black;
		border-radius: 50vw;
	}
	.wrapper label {
		font-weight: bold;
		pointer-events: none;
	}
	input::-webkit-file-upload-button,
	input::file-selector-button {
		cursor: pointer;
		appearance: none;
		border: 0;
		padding: 0.5em 1em;
		border-radius: 50vw;
		color: white;
		background-color: var(--blue_accent);
		font-weight: bold;
	}
	input::-webkit-file-upload-button:hover,
	input::file-selector-button:hover {
		transform: scale(0.97);
	}
	label[for='confirm'] {
		pointer-events: none;
		color: var(--disabled_text);
	}
	.confirm-container {
		margin-top: 5em;
	}
	.confirm:checked + .confirm_lbl {
		color: black;
	}
	.wrapper button {
		cursor: pointer;
		appearance: none;
		padding: 0.5em 1em;
		font-weight: bold;
		font-size: large;
		border-radius: 5px;
		border: 0;
		color: white;
		background-color: var(--upcolor_maroon);
		width: 100%;
		margin-bottom: 3em;
	}
	.wrapper button:disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}
</style>
