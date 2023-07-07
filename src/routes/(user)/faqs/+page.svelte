<script>
	function expand_all() {
		const checkbox = document.querySelectorAll("input[type='checkbox']");
		for (var i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = true;
		}
	}

	function collapse_all() {
		const checkbox = document.querySelectorAll("input[type='checkbox']");
		for (var i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = false;
		}
	}

	let top = 0;
	function getTop(event) {
		console.log(event);
		top = event.y;
		console.log(top);
	}
</script>

<svelte:window bind:scrollY={top} />
<svelte:head>
	<title>UP2GO: FAQs</title>
</svelte:head>

<section>
	<div class="faq-title">FREQUENTLY ASKED QUESTIONS</div>
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
		<div class="tab">
			<input type="checkbox" id="chck1" />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<label class="tab-label" for="chck1" on:click={getTop}
				>Requirements for the release of Honorable Dismissal</label
			>
			<div class="tab-content">
				<ul role="list">
					<li>
						<b>Letter from parents (not guardian) stating the reason for HD addressed to: </b>
						<ul>
							<li>
								<p>THE UNIVERSITY REGISTRAR</p>
								<p>Office of the University Registrar</p>
								<p>University of the Philippines Baguio</p>
								<p>Baguio City, 2600</p>
							</li>
						</ul>
					</li>
					<li><b>Latest University Clearance </b></li>
					<li>
						<b>Exit counseling from the Office of Counseling and Guidance </b>
					</li>
					<li><b>Official Transcript of Records (if applicable)</b></li>
					<li><b>Proof of payments for:</b></li>
					<ul>
						<li><i> Honorable Dismissal: </i> ₱20.00/copy</li>
						<li><i> Certificate of No Disciplinary Case: </i> ₱50.00/copy</li>
						<li><i> True Copy of Grades: </i> ₱50.00/copy</li>
						<li><i> Official Transcript of Records (OTR): </i> ₱50.00/copy</li>
						<li><i>Certified True Copy of OTR: </i> ₱50.00/copy (if applicable)</li>
					</ul>
				</ul>
			</div>
		</div>
		<div class="tab">
			<input type="checkbox" id="chck2" />
			<label class="tab-label" for="chck2">Item 2</label>
			<div class="tab-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!</div>
		</div>
	</div>
</section>

<style>
	section {
		display: block;
		margin-top: 5em;
		margin-left: auto;
		margin-right: auto;
		width: 75%;
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
		margin-bottom: 1em;
		color: #850038;
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
		background-color: #850038;
		border: none;
		padding: 10px;
		font-weight: 600;
		font-size: medium;
		text-transform: uppercase;
		border-radius: 0.25em;
	}
	.buttons button:focus-visible {
		outline: black double 2px;
	}
	/* Accordion styles */
	.tabs {
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
	}
	.tab {
		width: 100%;
		color: #850038;
		overflow: hidden;
	}
	.tab-label {
		display: flex;
		justify-content: space-between;
		padding: 1em;
		background: #fff;
		font-weight: bold;
		cursor: pointer;
		/* Icon */
	}
	.tab-label:hover {
		background: #dfdfdf;
	}
	.tab-label::after {
		content: '\276F';
		width: 1em;
		height: 1em;
		text-align: center;
		transition: all 0.35s;
	}
	.tab-content {
		pointer-events: none;
		max-height: 0;
		padding: 0 1em;
		color: #2c3e50;
		background: white;
		transition: all 0.35s;
	}
	input:checked + .tab-label {
		background: #850038;
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
		list-style-type: disc;
		padding: 10px;
	}
	.tab-content ul ul {
		list-style-type: none;
		padding: 10px 15px;
	}
</style>
