<script>
	import { onDestroy } from 'svelte';
	import {
		titleCase,
		checkSnum,
		validateSnum,
		validateNames,
		updatePrice,
		totalPrice,
		summaryPrices,
		handleYearLevel,
		handleScholarship,
		handleChecked,
		handleAtLeastCheckedOne,
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
	const priceUnsubscribe = totalPrice.subscribe((val) => (price = val));
	const summaryPriceUnsubscribe = summaryPrices.subscribe((val) => (summaryPrice = val));

	onDestroy(
		priceUnsubscribe,
		summaryPriceUnsubscribe,
		titleCase,
		checkSnum,
		validateSnum,
		updatePrice,
		totalPrice,
		summaryPrices,
		handleYearLevel,
		handleScholarship,
		handleChecked,
		validateNames,
		handleAtLeastCheckedOne
	);

	export let data;
</script>

<svelte:head>
	<title>UP2GO: Request Forms</title>
</svelte:head>

<div class="grid-container">
	<header class="form-header">Please fill all form fields to go to next step.</header>
	<aside class="aside-image"><img src="" alt="" /></aside>
	<main class="form-main">
		<form method="POST">
			<!-- personal information -->
			<fieldset>
				<legend>Personal Information</legend>
				<label for="fname">First Name</label>
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
				/>
				<label for="mname">Middle Name</label>
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
				/>
				<label for="lname">Last Name</label>
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
				/>
				<label for="snum">Student Number</label>
				<input
					type="number"
					id="snum"
					name="snum"
					on:input={checkSnum}
					on:keydown={validateSnum}
					bind:value={snum}
					maxLength="9"
					required
					autocomplete="off"
				/>
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={email}
					required
					autocomplete="off"
				/>
				<label for="yearLevel">Year Level</label>
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
				</select>
				<label for="scholarship">For Scholarship</label>
				<input
					type="checkbox"
					id="scholarship"
					name="scholarship"
					bind:checked={scholar}
					on:change={handleScholarship}
				/>
			</fieldset>
			<fieldset>
				<legend>Choose Forms</legend>
				Price: {price}
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
				{#if forms.length === 0}
					<p>Please select at least 1 form.</p>
				{:else}
					<p>Quantity: {forms.length}</p>
				{/if}
			</fieldset>
			<fieldset>
				<legend>Mode of Payment</legend>
				<input type="radio" name="paymentMethod" value="Online" bind:group={mop} required />
				<input type="radio" name="paymentMethod" value="Cash" bind:group={mop} />
				{mop}
			</fieldset>
			<fieldset>
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
			<button type="submit">Submit</button>
		</form>
	</main>
	<!-- svelte-ignore a11y-invalid-attribute -->
	<footer class="form-footer">
		<a class="next-btn" href="javascript:;" on:click={handleNextButton}>Next</a>
		<a class="prev-btn" href="javascript:;" on:click={handlePrevButton}>Previous</a>
	</footer>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px 1fr 100px;
		grid-template-areas: 'aside header' 'aside main' 'aside footer';
		gap: 10px;
		height: calc(100vh - 73.8px);
	}
	.aside-image {
		background-color: rgb(158, 173, 186);
		grid-area: aside;
	}
	.form-header {
		margin-top: auto;
		text-align: center;
		color: grey;
		grid-area: header;
	}
	.form-main {
		background-color: rgb(158, 173, 186);
		grid-area: main;
	}

	.request-form-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1em;
		padding: 0px 1em;
		font-weight: 500;
	}

	.request-form-container {
		position: relative;
		background-color: white;
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
		height: 120px;
		color: var(--upcolor_maroon);
		vertical-align: middle;
		border: 3px solid var(--upcolor_maroon);
		background-color: rgb(158, 173, 186);
	}

	.request-forms:checked ~ .request-form-label {
		color: var(--upcolor_green);
		border-color: var(--upcolor_green);
	}
	.request-forms:disabled ~ .request-form-label {
		color: white;
		border-color: white;
	}

	.request-form-price {
		display: flex;
		height: 40px;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		text-align: center;
		color: white;
		background-color: var(--upcolor_maroon);
	}

	.request-forms:checked ~ .request-form-price {
		background-color: var(--upcolor_green);
	}
	.request-forms:disabled ~ .request-form-price {
		background-color: white;
		color: black;
	}

	.form-footer {
		margin-bottom: auto;
		background-color: rgb(158, 173, 186);
		grid-area: footer;
	}
</style>
