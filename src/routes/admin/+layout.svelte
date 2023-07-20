<script>
	import up2go_white from '$lib/images/logos/up2go-white.png';
	import { SvelteToast } from '@zerodevx/svelte-toast';
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

<SvelteToast options={{ duration: 5000 }} />
<nav
	class="navbar navbar-expand-sm"
	style="border-bottom: 5px solid var(--upcolor_green); background-color: var(--upcolor_maroon)"
>
	<div class="container">
		<a class="navbar-brand" href="/"
			><img src={up2go_white} alt="UP2GoLogoWhite" width="auto" height="45" class="navlogo" /></a
		>
		<div class="navbar-items">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/admin/dashboard">Dashboard</a>
				</li>
			</ul>
		</div>
		<div class="nav-request">
			<button class="nav-link-req">
				<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
					/>
				</svg>
			</button>
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
	button {
		border: none;
	}
	.nav-link-req {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: small;
		color: var(--upcolor_maroon);
		font-weight: 600;
		background-color: #fff;
		border-radius: 50vw;
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
