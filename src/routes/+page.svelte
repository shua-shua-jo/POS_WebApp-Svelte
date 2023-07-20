<script>
	import uplogo from '$lib/images/logos/uplogo.png';
	import up2gologo_colored from '$lib/images/logos/up2go-colored.png';
</script>

<svelte:head>
	<title>UP2GO: Home</title>
</svelte:head>

<div class="content">
	<div class="start-page">
		<div class="grp-container">
			<h1 class="intro-title">A Project for University of the Philippines Baguio</h1>
		</div>
		<img class="intro-uplogo" alt="UP Logo" src={uplogo} />
	</div>
	<img alt="UP2GO Logo Colored" src={up2gologo_colored} />
	<div class="arrow bounce">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="var(--upcolor_green)"
				d="m18.707 12.707l-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293l-1.414 1.414L12 19.414z"
			/></svg
		>
	</div>
	<section class="start-button">
		<a class="start-btn" href="/manual">PROCEED</a>
	</section>
	<section class="social_icons">
		<a href="/about" title="About Us"
			><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
				/></svg
			></a
		>
		<a href="/contact" title="Contact Us"
			><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"
					fill="currentColor"
				/></svg
			></a
		>
		<a href="/faqs" title="FAQs"
			><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					d="M8.5 18l3.5 4l3.5-4H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.5zM7 7h10v2H7V7zm0 4h7v2H7v-2z"
					fill="currentColor"
				/></svg
			></a
		>
		<a href="/admin" title="Login"
			><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"
					fill="currentColor"
				/></svg
			></a
		>
	</section>
</div>

<style>
	.start-page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
		padding: 10px 5%;
		margin: 0 0 70px 0;
		background-color: var(--upcolor_maroon);
	}
	.start-page .grp-container {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.start-page .grp-container .intro-title {
		color: #fff;
		font-family: 'Montserrat', sans-serif;
		font-weight: 500;
		font-size: x-large;
		letter-spacing: 8px;
		text-align: center;
		margin-left: 8%;
	}

	.start-page .intro-uplogo {
		width: 110px;
		float: right;
		right: 8%;
		z-index: 2;
		position: absolute;
	}

	.content {
		width: 70%;
		text-align: center;
		width: 100%;
		height: 100vh;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
	}

	.content img {
		width: 800px;
	}

	.content .social_icons {
		position: fixed;
		right: 2vw;
		bottom: 2vh;
	}

	.content .social_icons::before {
		content: '';
		width: 1px;
		height: 100%;
		background-color: var(--upcolor_maroon);
		position: absolute;
		top: -100%;
	}

	.content .social_icons a {
		margin: 10px 0px;
		color: var(--upcolor_maroon);
		display: block;
		text-decoration: none;
		font-size: 1.5em;
		transition: 0.5s;
	}

	.content .social_icons a:hover {
		color: var(--upcolor_green);
		transform: scale(1.3);
	}

	.arrow {
		text-align: center;
		margin: 1.5% 0 1% 0;
	}

	.arrow svg {
		color: var(--upcolor_green);
		font-weight: 800;
		font-size: 40px;
		text-decoration: none;
	}

	.bounce {
		animation: bounce 2s infinite;
		-webkit-animation: bounce 2s infinite;
		-o-animation: bounce 2s infinite;
		-moz-animation: bounce 2s infinite;
		animation-timing-function: ease-out;
		-webkit-animation-timing-function: ease-out;
		-o-animation-timing-function: ease-out;
		-moz-animation-timing-function: ease-out;
	}

	@-webkit-keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-30px);
		}
		60% {
			transform: translateY(-15px);
		}
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-30px);
		}
		60% {
			transform: translateY(-15px);
		}
	}

	.content .start-button {
		position: relative;
		top: -10px;
	}

	.start-btn {
		color: var(--upcolor_green);
		float: right;
		width: 200px;
		padding: 10px 20px;
		border-radius: 40px;
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		font-weight: 800;
		text-decoration: none;
		font-size: 20px;
		text-align: center;
		border: 1px solid var(--upcolor_green);
		transition: 0.3s ease;
	}

	.start-btn:hover {
		background-color: var(--upcolor_green);
		color: #fff;
		transform: scale(1.1);
	}
	@media screen and (width <= 1366px) {
		.content {
			overflow: auto;
		}
		.content img {
			width: 50vw;
		}
		.start-page {
			width: auto;
			font-size: small;
		}
		/* .content .social_icons {
			position: fixed;
			left: 2vw;
			top: 2vh;
		}
		.content .social_icons::before {
			display: none;
		}
		.content .social_icons a svg {
			width: 18px;
			height: auto;
		} */
	}
</style>
