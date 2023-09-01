<script>
	import up2gologo_colored from '$lib/images/logos/up2go-colored.png';
	import uplogo from '$lib/images/logos/uplogo.png';
	import login_bg1 from '$lib/images/bg/login-bg1.jpg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { failed } from '$lib/toast/themes.js';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	onMount(async () => {
		if ($page.status === 200) {
			return;
		}
		await failed($page.form.message);
	});
	let showPass = false;
</script>

<svelte:head>
	<title>UP2GO: Admin Login</title>
</svelte:head>

<SvelteToast options={{ duration: 3000 }} />

<section class="login-page">
	<div class="login">
		<div class="back-btn" id="back-btn-log">
			<a href="/"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						d="M13.939 4.939L6.879 12l7.06 7.061l2.122-2.122L11.121 12l4.94-4.939z"
						fill="currentColor"
					/></svg
				><span>Home</span></a
			>
		</div>
		<div class="login-uplogo">
			<img class="up2go-login" src={up2gologo_colored} alt="UP2GO" />
		</div>
		<h2 class="login-title">ADMIN LOGIN</h2>
		<p class="notice">Please login to access the system</p>
		<form class="form-login" method="POST">
			<label for="email">Email</label>
			<div class="input-email">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333l8-5.333V8.7z"
						fill="var(--upcolor_maroon)"
					/></svg
				>
				<input
					class="admin_email"
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
					autocomplete="off"
					required
				/>
			</div>
			<label for="password">Password</label>
			<div class="input-password">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="var(--upcolor_maroon)"
						d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"
					/></svg
				>
				<input
					class="admin_password"
					type={!showPass ? 'password' : 'text'}
					id="password"
					name="password"
					placeholder="Enter your password"
					autocomplete="off"
					required
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				{#if showPass}
					<svg
						class="togglePass"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						on:click={() => {
							showPass = !showPass;
						}}
						><path
							fill="currentColor"
							d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
						/></svg
					>
				{:else}
					<svg
						class="togglePass"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						on:click={() => {
							showPass = !showPass;
						}}
						><path
							fill="currentColor"
							d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
						/></svg
					>
				{/if}
			</div>
			<button class="login-button" aria-label="Login Button" type="submit"
				><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
					><path
						d="M18.5 2h-13a.5.5 0 0 0-.5.5V11h6V8l5 4l-5 4v-3H5v8.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5z"
						fill="#fff"
					/></svg
				>
				<div>LOGIN</div></button
			>
		</form>
		<div class="login-uplogo">
			<img src={uplogo} alt="UP Logo" />
		</div>
	</div>
	<div class="background">
		<img src={login_bg1} alt="Admin Login Background" />
		<div class="login-line-container">
			<div class="login-line" />
		</div>
		<h1>
			<span>Unlock seamless convenience with</span> UP2GO |
			<span> Empowering your paperless transactions for a streamlined future.</span>
		</h1>
	</div>
</section>

<style>
	@media screen and (width < 1228.80px) {
		.background {
			display: none !important;
		}
	}
	.togglePass {
		position: absolute;
		cursor: pointer;
		right: 0;
		color: var(--disabled_text);
	}
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}

	.login-uplogo {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-uplogo img {
		width: 80px;
		height: auto;
	}

	#back-btn-log {
		display: flex;
		left: 30px;
		top: 30px;
		position: absolute;
	}

	#back-btn-log {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		vertical-align: middle;
		text-decoration: none;
		color: black;
	}

	#back-btn-log a {
		cursor: pointer;
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		vertical-align: middle;
		transition: all 0.3s ease-in-out;
	}
	.back-btn a > svg {
		transition: translate 0.3s ease-in-out;
	}
	.back-btn a:hover > svg {
		translate: -5px;
	}

	#back-btn-log a:active,
	#back-btn-log a:focus,
	#back-btn-log a:hover {
		color: var(--upcolor_maroon);
	}

	.login-uplogo .up2go-login {
		width: 220px;
		height: auto;
		margin-bottom: 30px;
	}

	.login-title {
		text-align: center;
	}

	.notice {
		font-size: 13px;
		text-align: center;
		color: #666;
		margin-bottom: 20px;
	}

	.login {
		width: 30%;
		height: 100vh;
		background: #fff;
		padding: 70px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.login-button {
		display: flex !important;
		flex-direction: row !important;
		align-items: center !important;
		justify-content: center !important;
		gap: 1em;
	}
	.form-login {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
	}

	.form-login label {
		text-align: left;
		font-size: 13px;
		margin-top: 5px;
		margin-left: 25px;
		display: block;
		color: #666;
	}

	.input-email,
	.input-password {
		width: 100%;
		background: #ededed;
		border-radius: 25px;
		margin: 4px 0 8px 0;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.input-password {
		position: relative;
	}

	.admin_email,
	.admin_password {
		border: 0;
		background: none;
		font-size: 16px;
		padding: 4px 0;
		outline: none;
	}

	button[type='submit'] {
		width: 100%;
		border: 0;
		border-radius: 25px;
		padding: 14px;
		background: var(--upcolor_maroon);
		color: #fff;
		display: inline-block;
		cursor: pointer;
		font-size: 16px;
		font-weight: bold;
		margin: 20px 0 50px 0;
		transition: ease all 0.3s;
	}

	button[type='submit']:hover {
		opacity: 0.9;
	}

	.background {
		width: 70%;
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: flex-end;
		align-content: center;
		flex-direction: row;
	}
	.background > img {
		width: 100%;
		height: inherit;
		object-fit: cover;
	}

	.background .login-line-container {
		width: 100%;
	}

	.background .login-line-container .login-line {
		width: 600px;
		height: 0px;
		background-color: #fafafa;
		border: 1px solid #fafafa;
		bottom: 140px;
		right: 40px;
		position: absolute;
	}

	.background h1 {
		position: absolute;
		bottom: 40px;
		right: 40px;
		max-width: 600px;
		font-size: 25px;
		color: #fff;
		text-align: right;
		padding: 0;
		margin: 0;
	}

	.background span {
		font-weight: 400;
	}
</style>
