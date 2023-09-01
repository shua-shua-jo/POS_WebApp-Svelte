<svelte:head>
	<title>UP2GO: Home</title>
</svelte:head>

<div class="body-wrapper">
	<svg viewBox="0 0 300 120">
		<path id="curve" fill="transparent" d="M18,100 C70,60 230,60 282,100" />
		<text>
			<textPath class="header" startOffset="50%" text-anchor="middle" xlink:href="#curve">
				Welcome to UP2GO
			</textPath>
		</text>
	</svg>
	<div class="content-container">
		<p>Request your documents</p>
		<ul class="content-swap">
			<li>here.</li>
			<li>conveniently.</li>
			<li>anywhere.</li>
			<li>anytime.</li>
			<li>all at once.</li>
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
	svg {
		position: absolute;
		top: 0;
		z-index: -1;
		text-align: center;
	}
	.header {
		font-size: 14pt;
		font-weight: 600;
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
			transform: translateY(1.1%);
		}
		12.5%,
		20% {
			transform: translateY(-20.6%);
		}
		25%,
		32.5% {
			transform: translateY(-42.05%);
		}
		37.5%,
		45% {
			transform: translateY(-63.8%);
		}
		50%,
		57.5% {
			transform: translateY(-85.25%);
		}
		62.5%,
		70% {
			transform: translateY(-63.8%);
		}
		75%,
		82.5% {
			transform: translateY(-42.05%);
		}
		87.5%,
		95% {
			transform: translateY(-20.6%);
		}
	}

	@-moz-keyframes change {
		0%,
		7.5%,
		100% {
			transform: translateY(1.1%);
		}
		12.5%,
		20% {
			transform: translateY(-20.6%);
		}
		25%,
		32.5% {
			transform: translateY(-42.05%);
		}
		37.5%,
		45% {
			transform: translateY(-63.8%);
		}
		50%,
		57.5% {
			transform: translateY(-85.25%);
		}
		62.5%,
		70% {
			transform: translateY(-63.8%);
		}
		75%,
		82.5% {
			transform: translateY(-42.05%);
		}
		87.5%,
		95% {
			transform: translateY(-20.6%);
		}
	}

	@keyframes change {
		0%,
		7.5%,
		100% {
			transform: translateY(1.1%);
		}
		12.5%,
		20% {
			transform: translateY(-20.6%);
		}
		25%,
		32.5% {
			transform: translateY(-42.05%);
		}
		37.5%,
		45% {
			transform: translateY(-63.8%);
		}
		50%,
		57.5% {
			transform: translateY(-85.25%);
		}
		62.5%,
		70% {
			transform: translateY(-63.8%);
		}
		75%,
		82.5% {
			transform: translateY(-42.05%);
		}
		87.5%,
		95% {
			transform: translateY(-20.6%);
		}
	}
</style>
