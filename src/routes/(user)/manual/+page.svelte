<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let visible = false;
	function start() {
		visible = true;
	}
	function reset() {
		visible = false;
	}
</script>

<svelte:head>
	<title>UP2GO: Manual</title>
</svelte:head>

{#if !visible}
	<label>
		<button aria-label="Start Tutorial" on:click={start}>Start Tutorial</button>
	</label>
{/if}

{#if visible}
	<div class="arrow" in:fly={{ delay: 250, duration: 300, y: 100, opacity: 0.5 }} out:fade>
		<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="m21.5 9.5l-1.41 1.42L17 7.83v5.67a6.5 6.5 0 0 1-6.5 6.5H4v-2h6.5c2.5 0 4.5-2 4.5-4.5V7.83l-3.09 3.08L10.5 9.5L16 4l5.5 5.5Z"
			/></svg
		>
	</div>
	<h2 transition:fly={{ delay: 250, duration: 300, y: 100, opacity: 0.5 }}>Home</h2>
	ddlol

	<h2 transition:fly={{ delay: 250, duration: 300, y: 100, opacity: 0.5 }}>About</h2>
	<button aria-label="Reset Tutorial" on:click={reset}>Reset</button>
{/if}
