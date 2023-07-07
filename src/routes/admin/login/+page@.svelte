<script>
	import up2gologo_colored from '$lib/images/logos/up2go-colored.png';
	import uplogo from '$lib/images/logos/uplogo.png';
	import login_bg1 from '$lib/images/bg/login-bg1.jpg';
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('.background').style.backgroundImage = 'url(' + login_bg1 + ')';
	});
</script>

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
		<form class="form-login" action="/login" method="POST">
			<label for="email">Email</label>
			<div class="input-email">
				<i class="bx bxs-envelope icon" />
				<input
					class="admin_email"
					type="email"
					name="email_login"
					placeholder="Enter your email"
					autocomplete="off"
					required
				/>
			</div>
			<label for="password">Password</label>
			<div class="input-password">
				<i class="bx bxs-lock icon" />
				<input
					class="admin_password"
					type="password"
					name="password"
					placeholder="Enter your password"
					autocomplete="off"
					required
				/>
			</div>
			<div class="checkbox" />
			<button type="submit"><i class="fas fa-door-open" /> LOGIN</button>
		</form>
		<div class="login-uplogo">
			<img src={uplogo} alt="UP Logo" />
		</div>
	</div>
	<div class="background">
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
	}

	#back-btn-log a:active,
	#back-btn-log a:focus,
	#back-btn-log a:hover {
		color: #850038;
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
	}

	.input-email,
	.input-password i {
		font-size: 20px;
	}

	.icon {
		padding: 4px;
		color: #850038;
		min-width: 40px;
		text-align: center;
	}

	.admin_email,
	.admin_password {
		width: 100%;
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
		background: #850038;
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
		padding: 40px;
		height: 100vh;
		background-size: cover;
		background-position-y: 80%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: flex-end;
		align-content: center;
		flex-direction: row;
		transition: 2s ease;
	}

	.background .login-line-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: right;
		justify-content: right;
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
