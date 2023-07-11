<script>
	import { onDestroy } from 'svelte';
	import {
		titleCase,
		checkSnum,
		addPrice,
		totalPrice,
		handleScholarship,
		handleHonorableDismissal,
		summaryPrices
	} from './forms.js';
	let fname = '',
		mname = '',
		lname = '',
		snum = null,
		email = '',
		yearlvl = '',
		scholar = false,
		forms = [],
		mop = '';
	$: name = fname + ' ' + mname + ' ' + lname;

	let price = 0;
	let summaryPrice = [];
	const priceUnsubscribe = totalPrice.subscribe((val) => (price = val));
	const summaryPricesUnsubscribe = summaryPrices.subscribe((val) => (summaryPrice = val));

	onDestroy(priceUnsubscribe, summaryPricesUnsubscribe);

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
					bind:value={fname}
					required
					autocomplete="off"
					maxlength="35"
				/>
				<label for="mname">Middle Name</label>
				<input
					type="text"
					id="mname"
					name="mname"
					placeholder="Optional"
					bind:value={mname}
					autocomplete="off"
				/>
				<label for="lname">Last Name</label>
				<input type="text" id="lname" name="lname" bind:value={lname} required autocomplete="off" />
				<label for="snum">Student Number</label>
				<input
					type="number"
					id="snum"
					name="snum"
					on:input={checkSnum}
					on:keydown={(evt) => {
						const forbiddenChars = ['.', '-', '+', 'e', 'E'];
						const inputChar = evt.key;
						if (forbiddenChars.includes(inputChar)) {
							evt.preventDefault();
						}
					}}
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
				<select name="yearLevel" id="yearLevel" bind:value={yearlvl} required>
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
				{#if data.summaries}
					{@const lists = data.summaries.list1.concat(data.summaries.list2)}
					{#each lists as form}
						{@const name = Object.keys(form)}
						{@const values = Object.values(form).map((value) => value)}
						{@const price = values[0].price}
						{@const isScholar = values[0].scholarship}
						<label for={name}>{name}</label>
						<input
							type="checkbox"
							class="request-forms"
							id={name}
							value={name}
							data-price={price}
							data-isscholar={isScholar ? 'scholar' : null}
							on:click={addPrice}
							on:change={name == 'Honorable Dismissal' ? handleHonorableDismissal : null}
							bind:group={forms}
						/>
						<span>{scholar & isScholar ? 0 : price}</span>
						<br />
					{/each}
				{/if}

				Price: {price}
				{#if forms.length === 0}
					<p>Please select at least 1 form.</p>
				{:else}
					<p>Quantity: {forms.length}</p>
					{#each forms as form, i}
						<p>
							1x {form}
						</p>
						:
						<div class="summary-price">{summaryPrice[i]}</div>
					{/each}
				{/if}
			</fieldset>
			<fieldset>
				<legend>Mode of Payment</legend>
				<input type="radio" name="payment_method" value="Online" bind:group={mop} />
				<input type="radio" name="payment_method" value="Cash" bind:group={mop} />
				{mop}
			</fieldset>
			<fieldset>
				<legend>Request Summary</legend>
				{name !== '  ' ? titleCase(name) : 'Name not specified.'}
				<br />
				{snum !== null ? snum : 'Student Number not specified.'} <br />
				{email !== '' ? email : 'Email not specified.'} <br />
				{yearlvl !== '' ? yearlvl : 'Year Level not specified.'} <br />
				{scholar ? 'Yes' : 'No'}
			</fieldset>
			<button>Submit</button>
		</form>
	</main>
	<footer class="form-footer"><a href="">Next</a><a href="">Previous</a></footer>
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
	.form-footer {
		margin-bottom: auto;
		background-color: rgb(158, 173, 186);
		grid-area: footer;
	}
</style>
