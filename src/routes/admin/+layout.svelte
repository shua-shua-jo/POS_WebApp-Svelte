<script>
	import up2go_white from '$lib/images/logos/up2go-white.png';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let dropdown = false;

	onNavigate(() => {
		if (!document.startViewTransition) return;

		return new Promise((fulfill) => {
			document.startViewTransition(() => new Promise(fulfill));
		});
	});
</script>

<SvelteToast options={{ duration: 2000 }} />

<svelte:window
	on:click={(event) => {
		const className = event.target.className;
		if (dropdown && !className.includes('dropdown')) {
			dropdown = false;
		}
	}}
/>

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
					<a
						class="nav-link"
						aria-current={$page.url.pathname === '/admin' ||
						$page.url.pathname.startsWith('/admin?login=success')
							? 'page'
							: null}
						title="Home"
						href="/admin">Home</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current={$page.url.pathname.startsWith('/admin/dashboard') ? 'page' : null}
						title="Dashboard"
						href="/admin/dashboard">Dashboard</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current={$page.url.pathname.startsWith('/admin/users') ? 'page' : null}
						title="Users"
						href="/admin/users">Users</a
					>
				</li>
			</ul>
		</div>
		<div class="nav-admin">
			<button
				class="nav-link-req"
				aria-label="Admin Icon"
				on:click={() => {
					dropdown = !dropdown;
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
					/>
				</svg>
			</button>
			{#if dropdown}
				<div class="dropdown" transition:fade={{ duration: 250 }}>
					<a href="/admin/logout">Logout</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<slot />

<style>
	:root {
		--toastContainerTop: 5rem;
	}
	/* template */

	a {
		color: #fff;
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
	.nav-admin {
		position: relative;
		margin-right: 20px;
	}
	.nav-admin .dropdown {
		position: absolute;
		background-color: white;
		color: black;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		width: 100px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.dropdown a {
		color: black;
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
	}
	.nav-link-req * {
		padding: 0px 5px;
	}
	ul {
		list-style: none;
	}
</style>
