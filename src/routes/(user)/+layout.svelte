<script>
	import up2go_white from '$lib/images/logos/up2go-white.png';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	onNavigate(() => {
		if (!document.startViewTransition) return;

		return new Promise((fulfill) => {
			document.startViewTransition(() => new Promise(fulfill));
		});
	});
</script>

<nav class="navbar navbar-expand-sm">
	<div class="container">
		<a class="navbar-brand" href="/"
			><img src={up2go_white} alt="UP2GoLogoWhite" width="auto" height="45" class="navlogo" /></a
		>
		<div class="navbar-items">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a
						class="nav-link nav-active"
						aria-current={$page.url.pathname.startsWith('/home') ? 'page' : undefined}
						href="/home">Home</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}
						href="/about">About Us</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}
						href="/contact">Contact Us</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current={$page.url.pathname.startsWith('/faqs') ? 'page' : undefined}
						href="/faqs">FAQs</a
					>
				</li>
			</ul>
		</div>
		<div class="nav-request">
			<a class="nav-link-req" href="/request-forms" target="_blank"
				><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path
						fill="var(--upcolor_maroon)"
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
		color: white;
		font-weight: 600;
		border-radius: 30px;
		text-align: center;
	}
	/*  */

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0px;
	}
	.navbar {
		border-bottom: 5px solid var(--upcolor_green);
		background-color: var(--upcolor_maroon);
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
		position: relative;
	}
	.nav-link:hover {
		font-weight: 600;
	}
	.nav-link:hover::after {
		content: '';
		position: absolute;
		width: 100%;
		left: 0;
		bottom: -2px;
		height: 1px;
		background-color: white;
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
		color: var(--upcolor_maroon);
		font-weight: 600;
		background-color: #fff;
		border-radius: 0.25em;
	}
	.nav-link-req:hover {
		background-color: #dfdfdf;
	}
	.nav-link-req:focus {
		scale: 0.98;
		background-color: #cfcfcf;
	}
	.nav-link-req * {
		padding: 0px 5px;
	}
	ul {
		list-style: none;
	}
</style>
