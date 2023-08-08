<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { success } from '$lib/toast/themes.js';

	onMount(async () => {
		const login = $page.url.searchParams.get('login');
		if (login && login == 'success') {
			await success('Login successful');
		}
	});
	let dialog = '';
</script>

<svelte:head>
	<title>UP2GO: Admin</title>
</svelte:head>

<h1>Welcome to admin page!</h1>

<form action="?/dummy" method="POST">
	<label for="num">Insert Number of Rows to Insert</label>
	<input type="number" name="num" id="num" required />
	<button type="submit">Generate Dummy Data</button>
</form>
