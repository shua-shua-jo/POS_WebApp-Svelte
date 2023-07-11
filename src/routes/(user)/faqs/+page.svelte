<script>
	import { onMount } from 'svelte';
	import list_style from '$lib/images/icons/list-style.svg';

	onMount(() => {
		document.querySelector(':root').style.setProperty('--listStyle', 'url(' + list_style + ')');
		document.querySelectorAll('.tab-label').forEach((el) => {
			el.addEventListener('click', getTop);
		});
	});

	// expands all tabs
	function expand_all() {
		const checkbox = document.querySelectorAll("input[type='checkbox']");
		for (var i = 0, n = checkbox.length; i < n; i++) {
			checkbox[i].checked = true;
		}
	}

	// collapses all tabs
	function collapse_all() {
		const checkbox = document.querySelectorAll("input[type='checkbox']");
		for (var i = 0, n = checkbox.length; i < n; i++) {
			checkbox[i].checked = false;
		}
	}

	// scroll to element
	let top = 0;
	function getTop(event) {
		console.log(event);
		top = event.pageY - 20;
	}

	// scroll to top
	let hidden = true;

	const goStart = () => {
		document.body.scrollIntoView();
	};

	const scrollElement = () => {
		return document.documentElement || document.body;
	};

	const handleScrollToTop = () => {
		if (scrollElement().scrollTop > 200) {
			hidden = false;
		} else {
			hidden = true;
		}
	};

	// fetch data queries
	export let data;
</script>

<svelte:window bind:scrollY={top} on:scroll={handleScrollToTop} />
<svelte:head>
	<title>UP2GO: FAQs</title>
</svelte:head>

<section>
	<button class="back_to_start" on:click={goStart} class:hidden
		><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"
			><path
				d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2S2 6.486 2 12s4.486 10 10 10zm0-15l5 5h-4v5h-2v-5H7l5-5z"
				fill="currentColor"
			/></svg
		></button
	>
	<div class="faq-title">FREQUENTLY ASKED QUESTIONS</div>
	<div class="line-container">
		<div class="line" />
	</div>
	<div class="buttons">
		<button class="expand" on:click={expand_all}
			><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m12 19.24l-4.95-4.95l-1.41 1.42L12 22.07l6.36-6.36l-1.41-1.42L12 19.24zM5.64 8.29l1.41 1.42L12 4.76l4.95 4.95l1.41-1.42L12 1.93L5.64 8.29z"
				/></svg
			>Expand All</button
		>
		<button class="collapse" on:click={collapse_all}
			><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 7.59L7.05 2.64L5.64 4.05L12 10.41l6.36-6.36l-1.41-1.41L12 7.59zM5.64 19.95l1.41 1.41L12 16.41l4.95 4.95l1.41-1.41L12 13.59l-6.36 6.36z"
				/></svg
			>Collapse All</button
		>
	</div>
	<div class="tabs">
		{#each data.faqs as faq, i}
			<div class="tab">
				<input type="checkbox" id="chck{i}" />
				<label class="tab-label" for="chck{i}">{faq.label}</label>
				<div class="tab-content">
					<ul role="list">
						{#each faq.contents as content}
							<li>
								{@html content}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	:root {
		--listStyle: '';
	}
	.back_to_start {
		opacity: 1;
		position: fixed;
		z-index: 99;
		right: 5%;
		user-select: none;
		bottom: 15%;
		border-radius: 50%;
		outline: none;
		border: none;
		cursor: pointer;
		background-color: transparent;
		color: rgba(0, 0, 0, 0.3);
		display: flex;
		vertical-align: middle;
		-webkit-animation: bounce 2s infinite;
		animation: bounce 2s infinite;
		transition: opacity 0.3s ease-in, visibility 0.3s ease-in, color 0.3s ease-in-out;
	}
	.back_to_start:hover {
		color: var(--upcolor_maroon);
		animation: none;
	}
	.back_to_start.hidden {
		opacity: 0;
		visibility: hidden;
		display: none;
	}
	section {
		display: block;
		margin-top: 5em;
		margin-left: auto;
		margin-right: auto;
		width: 75%;
		padding-bottom: 20dvh;
	}
	input {
		position: absolute;
		opacity: 0;
		z-index: -1;
	}
	.faq-title {
		font-size: 30px;
		font-weight: 700;
		line-height: 35px;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.buttons button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: white;
		background-color: var(--upcolor_maroon);
		border: none;
		padding: 10px;
		font-weight: 600;
		font-size: medium;
		text-transform: uppercase;
		border-radius: 0.25em;
	}
	.buttons button:hover {
		background-color: rgb(163, 0, 68);
	}
	.buttons button:focus-visible:not(:focus) {
		scale: 1;
		background-color: rgb(183, 0, 76);
	}
	.buttons button:active {
		scale: 0.98;
		background-color: var(--upcolor_maroon);
	}
	/* Accordion styles */
	.tab {
		width: 100%;
		border-radius: 8px;
		padding-top: 1em;
		color: var(--upcolor_maroon);
		overflow: hidden;
		box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
	}
	.tab-label {
		display: flex;
		justify-content: space-between;
		padding: 1em;
		background: #fff;
		font-weight: bold;
		cursor: pointer;
		text-transform: uppercase;
	}
	/* Icon */
	.tab-label:hover {
		background: #dfdfdf;
	}
	.tab-label::after {
		content: '\276F';
		width: 1em;
		height: 1em;
		text-align: center;
		transition: all 0.3s;
	}
	.tab-content {
		pointer-events: none;
		max-height: 0;
		padding: 0 1em;
		color: #2c3e50;
		background: #ebebeb;
		transition: all 0.3s;
	}
	input:checked + .tab-label {
		background: var(--upcolor_maroon);
		color: white;
	}
	input:checked + .tab-label::after {
		transform: rotate(90deg);
	}
	input:checked ~ .tab-content {
		max-height: 100vh;
		padding: 1em;
	}
	.tab-content ul {
		list-style: none;
		padding: 10px;
	}
	.tab-content > ul > li::before {
		content: '';
		display: inline-block;
		background-image: var(--listStyle);
		background-size: contain;
		background-repeat: no-repeat;
		height: 1em;
		width: 1em;
		translate: 0px 2px;
	}

	/* animations */
	@-webkit-keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-20px);
		}
		60% {
			transform: translateY(-10px);
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
			transform: translateY(-20px);
		}
		60% {
			transform: translateY(-10px);
		}
	}
</style>
