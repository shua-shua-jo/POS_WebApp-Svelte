<script>
	import { onMount } from 'svelte';
	import { success } from '$lib/toast/themes.js';

	export let data;
	onMount(async () => {
		if (data.login && data.login == 'success') {
			await success('Login successful');
		}
	});
	let dialog = '';
</script>

<svelte:head>
	<title>UP2GO: Admin</title>
</svelte:head>

<h1>Welcome to admin page!</h1>
