<script>
	import {
		titleCase,
		validateSnum,
		validateNames,
		updatePrice,
		totalPrice,
		summaryPrices,
		handleYearLevel,
		handleScholarship,
		handleChecked,
		progressNum,
		handleNextButton,
		handlePrevButton
	} from './forms.js';

	let fname = '',
		mname = '',
		lname = '',
		snum = null,
		email = '',
		yearlvl = '',
		scholar = false,
		forms = [],
		summaryPrice = new Map(),
		mop = '';
	$: name = fname + ' ' + mname + ' ' + lname;

	let price = 0;
	totalPrice.subscribe((val) => (price = val));
	summaryPrices.subscribe((val) => (summaryPrice = val));

	let next = true;
	let last = false;
	let progNum = 1;
	progressNum.subscribe((val) => (progNum = val));

	export let data;
</script>

<svelte:head>
	<title>UP2GO: Request Forms</title>
</svelte:head>

<div class="grid-container">
	<form method="POST">
		<aside class="aside-image"><img src="" alt="" /></aside>
		<header class="form-header">Please fill all form fields to go to next step.</header>
		<div class="form-progress-bar">
			<ul class="form-progress-steps">
				<li class="active activated"><span>1</span></li>
				<li><span>2</span></li>
				<li><span>3</span></li>
				<li><span>4</span></li>
			</ul>
		</div>
		<main class="form-main">
			<!-- personal information -->
			<fieldset class="info-fieldset {progNum !== 1 ? 'hidden' : ''}">
				<legend>Personal Information</legend>
				<label for="fname"
					>First Name
					<input
						type="text"
						id="fname"
						name="fname"
						pattern="[a-zA-Z ]*"
						on:keydown={validateNames}
						bind:value={fname}
						required
						autocomplete="off"
						maxlength="50"
					/></label
				>
				<label for="mname"
					>Middle Name
					<input
						type="text"
						id="mname"
						name="mname"
						pattern="[a-zA-Z ]*"
						on:keydown={validateNames}
						placeholder="Optional"
						bind:value={mname}
						autocomplete="off"
						maxlength="50"
					/></label
				>
				<label for="lname"
					>Last Name
					<input
						type="text"
						id="lname"
						name="lname"
						pattern="[a-zA-Z ]*"
						on:keydown={validateNames}
						bind:value={lname}
						required
						autocomplete="off"
						maxlength="50"
					/></label
				>
				<label for="snum"
					>Student Number
					<input
						type="text"
						id="snum"
						name="snum"
						on:keypress={validateSnum}
						bind:value={snum}
						maxLength="9"
						required
						autocomplete="off"
					/></label
				>
				<label for="email"
					>Email
					<input
						type="email"
						id="email"
						name="email"
						bind:value={email}
						required
						autocomplete="off"
					/></label
				>
				<label for="yearLevel"
					>Year Level
					<select
						name="yearLevel"
						id="yearLevel"
						bind:value={yearlvl}
						required
						on:change={handleYearLevel(yearlvl)}
					>
						<option disabled selected value="">Current Year Level</option>
						<option value="First Year">First Year</option>
						<option value="Second Year">Second Year</option>
						<option value="Third Year">Third Year</option>
						<option value="Fourth Year">Fourth Year</option>
						<option value="Graduate">Graduate Student</option>
						<option value="Alumni">Alumni</option>
					</select></label
				>
				<label class="for-scholarship-label" for="scholarship">
					<input
						type="checkbox"
						id="scholarship"
						name="scholarship"
						bind:checked={scholar}
						on:change={handleScholarship}
					/>For Scholarship</label
				>
			</fieldset>
			<fieldset class="forms-fieldset {progNum != 2 ? 'hidden' : ''}">
				<legend>Choose Forms</legend>
				<div class="form-labels">
					<div class="total-price-label"><b>Price:</b> Php {price}.00</div>
					<div class="form-container-label">
						{#if forms.length === 0}
							<p class="error-label">Please select at least 1 form.</p>
						{:else}
							<p><b>Quantity:</b> {forms.length}</p>
						{/if}
					</div>
				</div>
				<div class="request-form-list">
					{#if data.summaries}
						{@const lists = data.summaries.list1.concat(data.summaries.list2)}
						{#each lists as form}
							{@const name = Object.keys(form)}
							{@const values = Object.values(form).map((value) => value)}
							{@const price = values[0].price}
							{@const isScholar = values[0].scholarship}
							<div class="request-form-container">
								<input
									type="checkbox"
									class="request-forms"
									name="requestForms"
									id={name}
									value={name}
									data-price={price}
									data-isscholar={isScholar ? 'scholar' : null}
									on:click={updatePrice}
									on:click={handleChecked(name, this)}
									bind:group={forms}
								/>
								<div class="request-form-label">
									<label for={name}>{name}</label>
								</div>
								<div class="request-form-price">
									<div>
										Php <span data-value={name}>{price}</span>.00
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</fieldset>
			<fieldset class="payment-fieldset {progNum !== 3 ? 'hidden' : ''}">
				<legend>Mode of Payment</legend>
				<input type="radio" name="paymentMethod" value="Online" bind:group={mop} required />
				<input type="radio" name="paymentMethod" value="Cash" bind:group={mop} />
				{mop}
			</fieldset>
			<fieldset class="summary-fieldset {progNum !== 4 ? 'hidden' : ''}">
				<legend>Summary</legend>
				<h3>Request Summary</h3>
				{#if forms.length !== 0}
					{#each forms as form, i}
						<p>
							1x {form} : {summaryPrice.get(form.toString())}
						</p>
					{/each}
				{/if}
				<h3>Payment</h3>
				{mop !== '' ? mop : 'Not Specified'}<br />
				<h3>Request Details</h3>
				{name !== '  ' ? titleCase(name) : 'Not specified.'}
				<br />
				{snum !== null ? snum : 'Not specified.'} <br />
				{email !== '' ? email : 'Not specified.'} <br />
				{yearlvl !== '' ? yearlvl : 'Not specified.'} <br />
				{scholar ? 'Yes' : 'No'}
			</fieldset>
		</main>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<footer class="form-footer">
			<div class="form-buttons">
				{#if next}
					<a class="prev-btn" href="javascript:;" on:click={handlePrevButton(progNum)}>Previous</a>
				{/if}
				{#if progNum == 4}
					<button type="submit">Submit</button>
				{:else}
					<a class="next-btn" href="javascript:;" on:click={handleNextButton(progNum)}>Next</a>
				{/if}
			</div>
		</footer>
	</form>
</div>

<style>
	.hidden {
		display: none !important;
	}
	ul {
		list-style: none;
	}
	.grid-container > form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px auto 1fr 100px;
		grid-template-areas: 'aside header' 'aside progress-bar' 'aside main' 'aside footer';
		row-gap: 10px;
		height: calc(100vh - 73.8px);
	}
	.aside-image {
		background-color: rgb(158, 173, 186);
		height: inherit;
		grid-area: aside;
	}
	.form-header {
		margin-top: auto;
		text-align: center;
		color: gray;
		grid-area: header;
	}
	.form-progress-bar {
		grid-area: progress-bar;
		margin: 20px 0;
	}
	.form-main {
		grid-area: main;
	}

	fieldset {
		height: 60vh;
		padding: 20px;
		border: none;
	}
	.info-fieldset {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.info-fieldset label {
		display: flex;
		flex-direction: column;
		padding: 0px 10px;
		height: max-content;
	}

	.info-fieldset input {
		background-color: rgb(184, 184, 184);
		height: 55px;
		border: none;
		border-radius: 10px;
		padding: 10px;
	}
	.for-scholarship-label {
		flex-direction: row !important;
		align-items: center;
	}
	legend {
		text-align: center;
		font-weight: bold;
		font-size: 1.3em;
		margin-bottom: 10px;
	}
	.form-labels {
		display: flex;
		justify-content: space-between;
		padding-left: 1em;
		padding-right: 1.5em;
	}
	.request-form-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1em;
		padding: 0px 1em;
		font-weight: 500;
		height: 91%;
		overflow: scroll;
		scrollbar-color: var(--upcolor_maroon) white;
		text-transform: uppercase;
	}
	.request-form-list::-webkit-scrollbar {
		width: 0.5em;
	}
	.request-form-list::-webkit-scrollbar-thumb {
		background: var(--upcolor_maroon);
		border-radius: 50vw;
	}
	.request-form-list::-webkit-scrollbar-thumb:hover {
		background: #b3004a;
	}
	.request-form-list::-webkit-scrollbar-thumb:active {
		background: rgb(247, 235, 235);
	}
	.request-form-list::-webkit-scrollbar-track {
		background: white;
	}

	.request-form-container {
		position: relative;
		height: max-content;
		user-select: none;
		text-align: center;
	}

	.request-forms {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.request-forms:disabled {
		cursor: not-allowed;
	}
	.request-form-label {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 125px;
		color: var(--upcolor_maroon);
		vertical-align: middle;
		padding: 20px;
		line-height: 125%;
		border: 3px solid var(--upcolor_maroon);
	}

	.request-forms:checked ~ .request-form-label {
		color: var(--upcolor_green);
		border-color: var(--upcolor_green);
	}
	.request-forms:disabled ~ .request-form-label {
		color: var(--disabled_text);
		border-color: var(--disabled);
	}

	.request-form-price {
		display: flex;
		height: 40px;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		text-align: center;
		color: var(--disabled);
		background-color: var(--upcolor_maroon);
	}

	.request-forms:checked ~ .request-form-price {
		background-color: var(--upcolor_green);
	}
	.request-forms:disabled ~ .request-form-price {
		background-color: var(--disabled);
		color: var(--disabled_text);
	}
	.error-label {
		color: var(--upcolor_maroon);
	}
	.form-progress-steps li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25%;
		float: left;
		position: relative;
	}
	.form-progress-steps li::after {
		background-color: var(--gray_accent);
		content: '';
		height: 5px;
		left: 0;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		border-bottom: 1px solid #dddddd;
		border-top: 1px solid #dddddd;
	}
	.form-progress-steps li span {
		background-color: #dddddd;
		border-radius: 50%;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		position: relative;
		text-align: center;
		width: 40px;
		z-index: 1;
	}
	.form-progress-steps li:last-child::after {
		width: 50%;
	}
	.form-progress-steps li.active span,
	.form-progress-steps li.activated span {
		background-color: var(--upcolor_maroon);
		color: #ffffff;
	}
	.form-progress-steps li.active::after,
	.form-progress-steps li.activated::after {
		background-color: var(--upcolor_maroon);
		left: 50%;
		width: 50%;
		border-color: var(--upcolor_maroon);
	}
	.form-progress-steps li.activated::after {
		width: 100%;
		border-color: var(--upcolor_maroon);
	}
	.form-progress .form-progress-steps li:last-child::after {
		left: 0;
	}
	.form-footer {
		margin-bottom: auto;
		padding: 0 calc(1em + 20px);
		background-color: var(--disabled);
		grid-area: footer;
	}
	.form-buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
