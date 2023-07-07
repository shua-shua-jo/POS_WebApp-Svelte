<script>
	import up2go_white from '$lib/images/logos/up2go-white.png';
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		document.querySelectorAll('.nav-link').forEach((link) => {
			if (link.href === window.location.href) {
				link.classList.add('nav-active');
				link.setAttribute('aria-current', 'page');
			} else {
				link.classList.remove('nav-active');
				link.removeAttribute('aria-current', 'page');
			}
		});
	});
</script>

<nav
	class="navbar navbar-expand-sm"
	style="border-bottom: 5px solid #0e6021; background-color: #850038"
>
	<div class="container">
		<a class="navbar-brand" href="/"
			><img src={up2go_white} alt="UP2GoLogoWhite" width="auto" height="45" class="navlogo" /></a
		>
		<div class="navbar-items">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/manual">Manual</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/about">About Us</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/contact">Contact Us</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/faqs">FAQs</a>
				</li>
			</ul>
		</div>
		<div class="nav-request">
			<a class="nav-link-req" href="/request_forms"
				><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path
						fill="#850038"
						d="M14 2H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h7.81c-.53-.91-.81-1.95-.81-3c0-.33.03-.67.08-1H6v-2h7.81c.46-.8 1.1-1.5 1.87-2H6v-2h12v1.08c.33-.05.67-.08 1-.08s.67.03 1 .08V8l-6-6m-1 7V3.5L18.5 9H13m5 6v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"
					/></svg
				>
				<div>Request Forms</div></a
			>
		</div>
	</div>
</nav>

<slot />

<style>
	/* template */

	a {
		color: #fff;
		font-weight: 600;
		border-radius: 30px;
		text-align: center;
		text-transform: uppercase;
	}

	/*  */

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0px;
	}
	.navbar-brand {
		margin-left: 20px;
	}
	.navbar-nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
	}
	.nav-item {
		padding: 0px 20px;
	}
	.nav-link {
		font-weight: 400;
	}
	.nav-link:hover,
	.nav-link:active {
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	.nav-request {
		margin-right: 20px;
	}
	.nav-link-req {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5px 5px;
		font-size: small;
		color: #850038;
		font-weight: 600;
		background-color: #fff;
		border-radius: 0.25em;
	}
	.nav-link-req:hover {
		background-color: #dfdfdf;
	}
	.nav-link-req * {
		padding: 0px 5px;
	}
	ul {
		list-style: none;
	}
</style>
