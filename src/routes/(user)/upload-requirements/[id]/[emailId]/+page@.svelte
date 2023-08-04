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
	<title>UP2GO: Upload Requirements</title>
</svelte:head>
<SvelteToast options={{ duration: 3000 }} />

<div class="image-wrapper">
	<img src={up2go_colored} alt="UP2Go Colored Logo" />
</div>
{#if data.upload}
	<h2 class="header">upload your requirements here</h2>
{:else}
	<h1>Thank you for submitting your requirements!</h1>
	<a class="back-to-home" href="/">Back to Home</a>
{/if}
<div class="container">
	<div class="wrapper">
		{#if data.upload}
			<form method="POST" enctype="multipart/form-data">
				{#each data.requirements as req}
					{#if req == 'Preferred Format for True Copy of Grades'}
						<div>
							<label for="tcg">{req}:</label>
							<select name="tcg" id="tcg" required>
								<option value="Hard Copy">Hard Copy</option>
								<option value="Soft Copy">Soft Copy</option>
							</select>
						</div>
					{:else}
						<div>
							<label for="files">{req}:</label>
							<input type="hidden" name="fileTypes" value={req} />
							<input type="file" name="files" id="files" accept=".pdf" required />
						</div>
					{/if}
				{/each}
				<div class="confirm-container">
					<input class="confirm" type="checkbox" id="confirm" bind:checked={confirm} />
					<label class="confirm_lbl" for="confirm">I am done reviewing my uploaded files</label>
				</div>
				<input type="hidden" name="id" value={data.id} />
				<button disabled={!confirm}>Upload Files</button>
			</form>
		{/if}
	</div>
</div>

<style>
	h1 {
		text-align: center;
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
	select {
		font-weight: bold;
		border-radius: 5px;
		border: 2px solid var(--blue_accent);
		padding: 0.5em 1em;
		margin-left: 0;
		outline-color: var(--blue_accent);
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11pt;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}
	.wrapper div {
		margin-bottom: 1.5em;
	}
	.wrapper div:has(input[type='file'], select) {
		display: grid;
		grid-template-columns: 1fr 250px;
		gap: 2em;
		padding-bottom: 10px;
		border-bottom: 1px solid black;
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
		color: var(--disabled_text);
		background-color: var(--disabled);
	}
</style>
