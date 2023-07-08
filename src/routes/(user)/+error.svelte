<script>
	import { page } from '$app/stores';
</script>

<div class="center">
	<h1>Uh Oh!</h1>
	<h1>Looks like we have a problem!</h1>
	<h1>{$page.status} {$page.error.message}</h1>
</div>

<style>
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
