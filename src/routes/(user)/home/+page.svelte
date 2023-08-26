<svelte:head>
	<title>UP2GO: Home</title>
</svelte:head>

<div class="body-wrapper">
	<h1 class="header">Welcome to UP2GO</h1>
	<div class="content-container">
		<p>Request your documents</p>
		<ul class="content-swap">
			<li>here.</li>
			<li>smoothly.</li>
			<li>conveniently.</li>
			<li>anywhere.</li>
			<li>anytime.</li>
		</ul>
	</div>
</div>

<style>
	div.body-wrapper {
		width: 100%;
		height: calc(100dvh - 73.8px);
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 1em;
		align-items: center;
	}
	h1.header {
		text-align: center;
		font-size: 64pt;
	}
	div.content-container {
		font-weight: 600;
		font-size: 20pt;
		height: 2em;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	div.content-container p {
		display: inline;
		float: left;
		margin: 0;
	}
	ul.content-swap {
		align-self: flex-start;
		padding-left: 0.5em;
		text-align: left;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1em;

		-webkit-animation-name: change;
		-webkit-animation-duration: 12s;
		-webkit-animation-iteration-count: infinite;
		animation-name: change;
		animation-duration: 12s;
		animation-iteration-count: infinite;
	}
	ul.content-swap li {
		padding: 0.25em;
		width: max-content;
		color: white;
		border-radius: 10px;
		background-color: var(--upcolor_maroon);
		margin: 0;
	}

	@-o-keyframes change {
		0%,
		7.5%,
		100% {
			transform: translate3d(0, 1.1%, 0);
		}
		12.5%,
		20% {
			transform: translate3d(0, -20.6%, 0);
		}
		25%,
		32.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		37.5%,
		45% {
			transform: translate3d(0, -63.8%, 0);
		}
		50%,
		57.5% {
			transform: translate3d(0, -85.25%, 0);
		}
		62.5%,
		70% {
			transform: translate3d(0, -63.8%, 0);
		}
		75%,
		82.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		87.5%,
		95% {
			transform: translate3d(0, -20.6%, 0);
		}
	}

	@-moz-keyframes change {
		0%,
		7.5%,
		100% {
			transform: translate3d(0, 1.1%, 0);
		}
		12.5%,
		20% {
			transform: translate3d(0, -20.6%, 0);
		}
		25%,
		32.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		37.5%,
		45% {
			transform: translate3d(0, -63.8%, 0);
		}
		50%,
		57.5% {
			transform: translate3d(0, -85.25%, 0);
		}
		62.5%,
		70% {
			transform: translate3d(0, -63.8%, 0);
		}
		75%,
		82.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		87.5%,
		95% {
			transform: translate3d(0, -20.6%, 0);
		}
	}

	@keyframes change {
		0%,
		7.5%,
		100% {
			transform: translate3d(0, 1.1%, 0);
		}
		12.5%,
		20% {
			transform: translate3d(0, -20.6%, 0);
		}
		25%,
		32.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		37.5%,
		45% {
			transform: translate3d(0, -63.8%, 0);
		}
		50%,
		57.5% {
			transform: translate3d(0, -85.25%, 0);
		}
		62.5%,
		70% {
			transform: translate3d(0, -63.8%, 0);
		}
		75%,
		82.5% {
			transform: translate3d(0, -42.05%, 0);
		}
		87.5%,
		95% {
			transform: translate3d(0, -20.6%, 0);
		}
	}
</style>
