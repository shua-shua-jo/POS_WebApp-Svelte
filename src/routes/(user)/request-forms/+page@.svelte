<script>
	import bg_upb1 from '$lib/images/bg/bg-upb1.jpg';
	import up2go_colored from '$lib/images/logos/up2go-colored.png';
	import { success, failed, reload } from '$lib/toast/themes.js';
	import * as func from '$lib/utils/forms.js';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let submittingForm = false;

	let fname = '',
		mname = '',
		lname = '',
		snum = '',
		email = '',
		yearlvl = '',
		scholar = false,
		forms = '',
		summaryPrice = new Map(),
		mop = '',
		purpose = '',
		confirm = false,
		btndsbl = false;
	$: name = fname + ' ' + mname + ' ' + lname;

	let price = 0;
	func.totalPrice.subscribe((val) => (price = val));
	func.summaryPrices.subscribe((val) => (summaryPrice = val));

	let next = true;
	let progNum = 1;
	func.progressNum.subscribe((val) => (progNum = val));

	async function showNotif() {
		const status = $page.status;
		const email = $page.form.email;
		console.log($page);
		if (status == 400) {
			await failed($page.form.message);
			await failed(`Error sending email to <b>${email}</b>`);
			setTimeout(async () => {
				await reload();
			}, 3000);
		} else if (status == 200 && $page.form.success == true) {
			await success($page.form.message);
			if ($page.form.emailSent == 'false') {
				await failed(`Error sending email to <b>${email}</b>`);
			} else {
				await success(`An email has been sent to <b>${email}</b>`);
			}
			setTimeout(() => {
				window.location.replace('/request-forms?success=true');
			}, 5000);
		}
	}

	export let data;
</script>

<noscript>
	<div class="no-script">
		<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
			><path fill="currentColor" d="M10 3h4v11h-4V3m0 18v-4h4v4h-4Z" /></svg
		>
		<p>Oh no, you either have JavaScript turned off or your browser doesn't support JavaScript.</p>
	</div>
</noscript>

<svelte:head>
	<title>UP2GO: Request Forms</title>
</svelte:head>
<SvelteToast options={{ duration: 5000 }} />

{#if submittingForm}
	<div class="loader-container">
		<span class="loader" />
		<h3>Submitting Form</h3>
	</div>
{/if}

<div class="grid-container">
	<form
		method="POST"
		on:submit={func.handleSubmit}
		use:enhance={async () => {
			submittingForm = true;
			return async ({ update }) => {
				submittingForm = false;
				confirm = false;
				btndsbl = true;
				await update();
				await showNotif();
			};
		}}
	>
		<aside class="aside-image"><img src={bg_upb1} alt="UPB Oblation at night" /></aside>
		<div class="back-btn" id="back-btn-log">
			<a aria-label="Back to Home" href="/"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						d="M13.939 4.939L6.879 12l7.06 7.061l2.122-2.122L11.121 12l4.94-4.939z"
						fill="currentColor"
					/></svg
				>
				<span>Home</span>
			</a>
			<img src={up2go_colored} alt="UP2GO Colored Logo" />
		</div>
		<header class="form-header">Please fill all form fields to go to next step.</header>
		<div class="form-progress-bar">
			<ul class="form-progress-steps">
				<li class="active activated"><span>1</span></li>
				<li class:activated={progNum >= 2}><span>2</span></li>
				<li class:activated={progNum >= 3}><span>3</span></li>
				<li class:activated={progNum >= 4}><span>4</span></li>
			</ul>
		</div>

		<main class="form-main">
			<!-- personal information -->
			<fieldset class="info-fieldset" class:hidden={progNum != 1}>
				<legend>Personal Information</legend>
				<div class="inputs">
					<label class="info-label" for="fname">
						<span class="span-input">
							<input
								class="info-input"
								type="text"
								id="fname"
								name="fname"
								pattern="^\s*[a-zA-Z]+[a-zA-Z ]*$"
								placeholder=" "
								on:keypress={func.handleNames}
								bind:value={fname}
								required
								autocomplete="off"
								maxlength="50"
							/>
						</span>
						<div class="label-text">First Name</div>
					</label>
					{#if fname.trim() == ''}
						<div class="error-label error-info">Please enter your first name.</div>
					{:else if !func.validateNames(fname.trim())}
						<div class="error-label error-info">Please enter a valid text.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label" for="mname">
						<span class="span-input">
							<input
								class="info-input"
								type="text"
								id="mname"
								name="mname"
								pattern="^\s*[a-zA-Z]+[a-zA-Z ]*$"
								placeholder="N/A (Optional)"
								on:keypress={func.handleNames}
								bind:value={mname}
								autocomplete="off"
								maxlength="50"
							/>
						</span>
						<div class="label-text">Middle Name</div>
					</label>
					{#if mname !== '' && !func.validateNames(mname.trim())}
						<div class="error-label error-info">Please enter a valid text.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label" for="lname">
						<span class="span-input">
							<input
								class="info-input"
								type="text"
								id="lname"
								name="lname"
								pattern="^\s*[a-zA-Z]+[a-zA-Z ]*$"
								placeholder=" "
								on:keypress={func.handleNames}
								bind:value={lname}
								required
								autocomplete="off"
								maxlength="50"
							/>
						</span>
						<div class="label-text">Last Name</div>
					</label>
					{#if lname.trim() == ''}
						<div class="error-label error-info">Please enter your last name.</div>
					{:else if !func.validateNames(lname.trim())}
						<div class="error-label error-info">Please enter a valid text.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label" for="snum">
						<span class="span-input">
							<input
								class="info-input"
								type="text"
								id="snum"
								name="snum"
								pattern="^20[0-2]((?<!2)[\d]|(?<=2)[0-3])[\d]+$"
								placeholder=" "
								on:keypress={func.handleSnum}
								bind:value={snum}
								minlength="9"
								maxlength="9"
								required
								autocomplete="off"
							/>
						</span>
						<div class="label-text">Student Number</div>
					</label>
					{#if snum == ''}
						<div class="error-label error-info snum-error">
							Please enter your student number. <br />(Ex: 20209999)
						</div>
					{:else if !func.validateSnum(snum.trim())}
						<div class="error-label error-info">Please enter a valid student number.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label" for="email">
						<span class="span-input">
							<input
								class="info-input"
								type="email"
								id="email"
								name="email"
								placeholder=" "
								bind:value={email}
								required
								autocomplete="off"
							/>
						</span>
						<div class="label-text">Email</div>
					</label>
					{#if email == ''}
						<div class="error-label error-info">Please enter your email address.</div>
					{:else if !func.validateEmail(email.trim())}
						<div class="error-label error-info">Please enter a valid email address.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label year-container" for="yearLevel">
						<span class="span-input has-year-input">
							<select
								class="info-input year-input"
								name="yearLevel"
								id="yearLevel"
								bind:value={yearlvl}
								required
								on:change={func.handleYearLevel(yearlvl)}
							>
								<option disabled selected value="" />
								<option value="First Year">First Year</option>
								<option value="Second Year">Second Year</option>
								<option value="Third Year">Third Year</option>
								<option value="Fourth Year">Fourth Year</option>
								<option value="Graduate">Graduate Student</option>
								<option value="Alumni">Alumni</option>
							</select>
						</span>
						<div class="label-text year-label">Year Level</div>
					</label>
					{#if yearlvl == ''}
						<div class="error-label">Please choose your current year level.</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="for-scholarship-label" for="scholarship">
						<input
							type="checkbox"
							id="scholarship"
							name="scholarship"
							bind:checked={scholar}
							on:change={func.handleScholarship}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"
							/>
						</svg>
						For Scholarship
					</label>
					{#if forms[0] == 'Honorable Dismissal'}
						<div class="error-label">Invalid for requesting of Honorable Dismissal</div>
					{/if}
				</div>
				<div class="inputs">
					<label class="info-label" for="purpose">
						<span class="span-input">
							<input
								class="info-input"
								type="text"
								id="purpose"
								name="purpose"
								pattern="^\s*[A-Za-z\d\x28\x29\x2C-\x2F\x3A]+[A-Za-z\d\x28\x29\x2C-\x2F\x3A ]*$"
								placeholder=" "
								maxlength="255"
								bind:value={purpose}
								on:keypress={func.validateText(purpose.trim())}
								autocomplete="off"
								required
							/>
						</span>
						<div class="label-text">Purpose</div>
					</label>
					{#if purpose.trim() == ''}
						<div class="error-label error-info">Please state your purpose.</div>
					{:else if !func.validateText(purpose.trim())}
						<div class="error-label error-info">Please enter a valid text.</div>
					{/if}
				</div>
			</fieldset>
			<fieldset class="forms-fieldset" class:hidden={progNum != 2}>
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
									on:click={func.updatePrice}
									on:click={func.handleChecked(name, this)}
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
			<fieldset class="payment-fieldset" class:hidden={progNum != 3}>
				<legend>Mode of Payment</legend>
				<div class="payment-container">
					<div class="online-container">
						<input
							class="input-payment"
							type="radio"
							name="paymentMethod"
							value="Online"
							bind:group={mop}
							required
						/>
						<div class="payment-type">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M15 14v-3h3V9l4 3.5l-4 3.5v-2h-3m-1-6.3V9H2V7.7L8 4l6 3.7M7 10h2v5H7v-5m-4 0h2v5H3v-5m10 0v2.5l-2 1.8V10h2m-3.9 6l-.6.5l1.7 1.5H2v-2h7.1m7.9-1v3h-3v2l-4-3.5l4-3.5v2h3Z"
								/></svg
							>
							&nbsp;via Bank Transfer
						</div>
					</div>
					<div class="cash-container">
						<input
							class="input-payment"
							type="radio"
							name="paymentMethod"
							value="Cash"
							bind:group={mop}
						/>
						<div class="payment-type">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M11 8c0 2.21-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4m0 6.72V20H0v-2c0-2.21 3.13-4 7-4c1.5 0 2.87.27 4 .72M24 20H13V3h11v17m-8-8.5a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 1-5 0M22 7a2 2 0 0 1-2-2h-3c0 1.11-.89 2-2 2v9a2 2 0 0 1 2 2h3c0-1.1.9-2 2-2V7Z"
								/></svg
							>
							&ensp;via Cash Office
						</div>
					</div>
				</div>
				{#if mop == ''}
					<p class="error-label payment-error">Please select your mode of payment.</p>
				{/if}
				<div class="payment-info">
					{#if mop == 'Cash'}
						<div class="info cash-info">
							<div class="cashpay-info">
								<div class="bank">For Cash Payment</div>
								<div class="cash-details">
									For students/alumni who would like to pay cash, <em>kindly proceed</em> to the
									<b> University's Cash Office </b>after you receive your invoice at the end of this
									transaction.
								</div>
							</div>
						</div>
					{:else if mop == 'Online'}
						<div class="info online-info">
							<div class="lbp-info">
								<div class="bank">Land Bank of the Philippines</div>
								<div class="account-details">
									<b>Account Name:</b>
								</div>
								<div class="account-info">
									UP Baguio Revolving Fund Governor Pack Road Baguio City
								</div>
								<div class="account-details"><b>Account Number:</b></div>
								<div class="account-info">0221-3287-28</div>
							</div>
							<p>or</p>
							<div class="dbp-info">
								<div class="bank">Department Bank of the Philippines</div>
								<div class="account-details">
									<b>Account Name:</b>
								</div>
								<div class="account-info">UP Baguio Revolving Fund</div>
								<div class="account-details"><b>Account Number:</b></div>
								<div class="account-info">0-00364-510-7</div>
							</div>
						</div>
					{/if}
				</div>
			</fieldset>
			<fieldset class="summary-fieldset" class:hidden={progNum != 4}>
				<div class="summary-container">
					<h4>Request Summary</h4>
					<div class="summary-grid">
						{#each forms as form}
							<div class="item">1x {form}</div>
							<b class="item">Php {summaryPrice.get(form.toString())}.00</b>
							<input type="hidden" name="requestPrices" value={summaryPrice.get(form.toString())} />
						{/each}
					</div>
					<div class="summary-grid summary-total">
						<div class="total-price"><b>TOTAL</b></div>
						<b class="bold-price">Php {price}.00</b>
						<input type="hidden" name="totalPrice" value={price} />
					</div>
					<h4>Payment</h4>
					<div>{mop}</div>
					<h4>Request Details</h4>
					<div class="summary-grid">
						<div class="item">Name</div>
						<b class="item name">{name}</b>
						<div class="item">Student Number</div>
						<b class="item">{snum}</b>
						<div class="item">Email</div>
						<b class="item">{email}</b>
						<div class="item">Year Level</div>
						<b class="item">{yearlvl}</b>
						<div class="item">For Scholarship</div>
						<b class="item">{scholar ? 'Yes' : 'No'}</b>
						<div class="item">Purpose</div>
						<b class="item">{purpose}</b>
					</div>
				</div>
				<label class="confirm-label" for="confirm"
					><input
						type="checkbox"
						id="confirm"
						required
						bind:checked={confirm}
						disabled={btndsbl ? 'disabled' : null}
					/>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"
						/>
					</svg></label
				>
				<span>I am done reviewing my request.</span>
			</fieldset>
		</main>
		<footer class="form-footer">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<div class="form-buttons">
				{#if next}
					<a
						class="btn"
						class:invinsible={progNum == 1 || btndsbl}
						class:disabled={btndsbl}
						href=""
						on:click={func.handlePrevButton(progNum)}
						disabled={btndsbl ? 'disabled' : null}
					>
						Previous
					</a>
				{/if}
				{#if progNum == 4}
					<button
						class="submit-button"
						class:disabled={!confirm}
						aria-label="Submit"
						type="submit"
						disabled={confirm ? null : 'disabled'}>Submit</button
					>
				{:else}
					<a
						class="btn"
						class:invinsible={btndsbl}
						class:disabled={btndsbl}
						href=""
						on:click={func.handleNextButton(progNum)}
						disabled={btndsbl ? 'disabled' : null}>Next</a
					>
				{/if}
			</div>
		</footer>
	</form>
</div>

<style>
	.no-script {
		user-select: none;
		position: fixed;
		background-color: #26303887;
		color: yellow;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		text-align: center;
		width: 100%;
		height: 100%;
		z-index: 100000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.no-script p {
		padding: 0 1em;
		width: 50vw;
		font-size: xx-large;
		font-weight: 900;
	}
	.loader-container {
		user-select: none;
		cursor: wait;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		gap: 5px;
		background-color: #26303887;
		backdrop-filter: blur(6px);
		z-index: 100;
	}
	.loader-container h3 {
		width: max-content;
		overflow-wrap: break-word;
		text-transform: uppercase;
		font-size: 1em;
		letter-spacing: 4px;
		color: white;
		z-index: -1;
		animation: textanim 4s linear infinite;
	}
	@keyframes textanim {
		0% {
			transform: scale(0.95);
		}
		5% {
			transform: scale(1);
		}
		0%,
		30% {
			filter: blur(0px);
		}
		95% {
			opacity: 0;
			filter: blur(10px);
		}
		100% {
			opacity: 1;
			filter: blur(0px);
		}
	}
	.loader {
		position: relative;
		width: 180px;
		height: 82.5px;
		background-repeat: no-repeat;
		background-image: radial-gradient(circle 2.5px, #ff3d00 100%, transparent 0),
			linear-gradient(#525252 90px, transparent 0), linear-gradient(#ececec 120px, transparent 0),
			linear-gradient(to right, #eee 10%, #333 10%, #333 90%, #eee 90%);

		background-size: 7.5px 7.5px, 135px 15px, 180px 67.5px, 150px 22.5px;
		background-position: 165px 22.5px, center bottom, center bottom, center 0;
	}
	.loader:before {
		content: '';
		width: 105px;
		background-color: #fff;
		box-shadow: 0 0 10px #0003;
		position: absolute;
		left: 50%;
		transform: translatex(-50%);
		bottom: calc(100% - 15px);
		animation: printerPaper 4s ease-in infinite;
	}
	.loader:after {
		content: '';
		width: 105px;
		height: 120px;
		background-color: #fff;
		background-image: linear-gradient(to bottom, #fff 50%, var(--upcolor_maroon) 51%),
			linear-gradient(to bottom, #bbb 50%, #0000 51%);
		background-size: 90px 30px, 90px 15px;
		background-repeat: no-repeat, repeat-y;
		background-position: center 82.5px, center 0;
		position: absolute;
		left: 50%;
		transform: translatex(-50%) rotate(180deg);
		box-shadow: 0 15px #fff inset;
		top: calc(100% - 12px);
		animation: PrintedPaper 4s ease-in infinite;
	}

	@keyframes printerPaper {
		0%,
		25% {
			height: 75px;
		}
		75%,
		100% {
			height: 0;
		}
	}

	@keyframes PrintedPaper {
		0%,
		30% {
			height: 0px;
			top: calc(100% - 12px);
		}

		80% {
			height: 120px;
			top: calc(100% - 12px);
			opacity: 1;
		}
		100% {
			height: 120px;
			top: calc(100% + 15px);
			opacity: 0;
		}
	}

	.hidden {
		display: none !important;
	}
	.invinsible {
		visibility: hidden;
		opacity: 0;
	}
	ul {
		list-style: none;
	}
	h4 {
		text-transform: uppercase;
		margin-bottom: 5px;
	}
	.grid-container > form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 50px auto auto 100px;
		grid-template-areas: 'aside back-btn' 'aside header' 'aside progress-bar' 'aside main' 'aside footer';
		row-gap: 10px;
		height: 100vh;
	}
	.aside-image {
		background-color: rgb(158, 173, 186);
		height: inherit;
		grid-area: aside;
		overflow: hidden;
	}
	.aside-image img {
		width: 100%;
		height: inherit;
		object-fit: cover;
	}
	.back-btn {
		position: relative;
		margin-top: 2em;
		padding: 0 5em;
		grid-area: back-btn;
	}
	.back-btn a {
		display: flex;
		width: max-content;
		justify-content: flex-start;
		align-items: center;
		color: var(--upcolor_maroon);
		border: none;
		transition: all 0.3s ease-in-out;
	}
	.back-btn a > svg {
		transition: translate 0.3s ease-in-out;
	}
	.back-btn a:hover > svg {
		translate: -5px;
	}
	.back-btn img {
		position: absolute;
		width: 12.5%;
		right: 0;
		left: 0;
		top: -1em;
		margin: 0 auto;
	}
	.form-header {
		margin: auto;
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
		grid-template-rows: 100px 100px 100px 100px;
	}
	.info-fieldset .info-label {
		display: block;
		text-align: center;
	}
	.info-label .label-text {
		color: #8e8e8e;
		cursor: text;
		line-height: 20px;
		font-size: small;
		text-transform: uppercase;
		-moz-transform: translateY(-30px);
		-ms-transform: translateY(-30px);
		-webkit-transform: translateY(-30px);
		transform: translateY(-30px);
		transition: all 0.3s;
		user-select: none;
	}
	.info-label .year-label {
		cursor: pointer;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: -1;
	}
	.info-label .info-input {
		border: 0;
		background-color: transparent;
		text-align: center;
		color: black;
		outline: 0;
		height: 35px;
		font-size: medium;
		width: 250px;
		position: relative;
	}
	.info-label .year-input {
		text-align: center;
	}
	.info-label .year-input:focus {
		width: 300px;
	}
	.span-input::after {
		content: '';
		position: absolute;
		border: 5px solid black;
		bottom: 1.25em;
		border: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		height: 3px;
		width: 250px;
		background-color: var(--upcolor_maroon);
		transition: width 0.3s ease, transform 0.3s ease, left 0.3s ease;
	}
	.info-label .has-year-input::after {
		bottom: 0;
	}
	.inputs .year-container {
		cursor: pointer;
		transform: translateY(-4px);
	}
	.info-label .span-input:has(.info-input:focus)::after {
		left: -25px;
		width: 300px;
	}
	.info-label .span-input:has(.info-input:invalid)::after {
		background-color: var(--upcolor_maroon);
	}
	.info-label .span-input:has(.info-input:valid)::after {
		background-color: var(--upcolor_green);
	}
	.info-label .span-input:has(.year-input:valid)::after {
		bottom: 6px;
	}
	.info-label .span-input:has(.info-input:valid:not(:required))::after {
		background-color: #8e8e8e;
	}
	.info-label .span-input:has(.info-input:focus) + .label-text {
		color: black;
		font-size: 10px;
		-moz-transform: translateY(-60px);
		-ms-transform: translateY(-60px);
		-webkit-transform: translateY(-60px);
		transform: translateY(-60px);
	}
	.info-label:has(> .span-input:has(.info-input:focus)) + .error-info {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s;
	}
	.info-label .span-input:has(.info-input:invalid) + .label-text {
		color: var(--upcolor_maroon);
	}
	.info-label
		.span-input:has(.info-input:invalid:not(:placeholder-shown))
		+ .label-text:not(.year-label) {
		-moz-transform: translateY(-60px);
		-ms-transform: translateY(-60px);
		-webkit-transform: translateY(-60px);
		transform: translateY(-60px);
	}
	.info-label .span-input:has(.info-input:valid) + .label-text {
		font-size: 10px;
		-moz-transform: translateY(-60px);
		-ms-transform: translateY(-60px);
		-webkit-transform: translateY(-60px);
		transform: translateY(-60px);
		color: var(--upcolor_green);
	}
	.info-label .span-input:has(.info-input:valid:not(:required)) + .label-text {
		color: #8e8e8e;
	}
	label.confirm-label,
	label.for-scholarship-label {
		position: relative;
		user-select: none;
		cursor: pointer;
		margin-bottom: 0;
		padding-left: 20px;
		font-weight: 400;
		color: #7a7a7a;
	}
	label.confirm-label input,
	label.for-scholarship-label input {
		visibility: hidden;
		appearance: initial;
	}
	label.confirm-label svg,
	label.for-scholarship-label svg {
		position: absolute;
		visibility: hidden;
		top: 0;
		left: 1px;
		z-index: 1;
	}
	label.confirm-label input::before,
	label.for-scholarship-label input::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		display: block;
		width: 18px;
		height: 18px;
		background-color: #fff;
		border: 1px solid #8e8e8e;
		visibility: visible;
	}
	label.confirm-label input:checked + svg,
	label.for-scholarship-label input:checked + svg {
		visibility: visible;
		color: white;
	}
	label.confirm-label input:checked::before,
	label.for-scholarship-label input:checked::before {
		background-color: var(--upcolor_green);
	}
	label.confirm-label:has(input:checked),
	label.for-scholarship-label:has(input:checked) {
		color: black;
	}
	label.for-scholarship-label:has(input:disabled) {
		cursor: not-allowed;
		color: #8e8e8e;
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
		padding: 0 1em;
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
		background: var(--upcolor_maroon);
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
	.payment-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}
	.payment-container > div {
		position: relative;
		user-select: none;
		text-align: center;
		border-radius: 10px;
		padding: 10px 20px;
		border: 2px solid var(--disabled_text);
		color: var(--disabled_text);
	}
	.payment-type {
		display: flex;
		height: 25px;
		align-items: center;
		justify-content: center;
	}
	.payment-container > div:has(.input-payment:checked) {
		color: white;
		border: 2px solid var(--upcolor_maroon);
		background-color: var(--upcolor_maroon);
	}
	.payment-container input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.payment-info {
		padding: 1em;
		height: max-content;
	}
	.payment-info > .info {
		display: flex;
		justify-content: center;
		height: 100%;
		align-items: center;
	}
	.payment-error {
		text-align: center;
	}
	.online-info {
		flex-direction: column;
		gap: 1em;
	}
	.cash-info > div {
		display: grid;
		background-color: var(--disabled);
		box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
		border-radius: 10px;
		padding: 10px;
		width: 75%;
		gap: 1em;
		grid-template-rows: auto auto;
		grid-template-areas: 'account-header account-header';
	}
	.online-info > div {
		display: grid;
		background-color: var(--disabled);
		box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
		border-radius: 10px;
		padding: 10px;
		width: 75%;
		gap: 1em;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas: 'account-header account-header';
	}
	.bank {
		font-weight: bold;
		text-transform: uppercase;
		padding-bottom: 5px;
		border-bottom: 1px solid black;
		grid-area: account-header;
	}
	.cash-details {
		text-align: center;
	}
	.inputs {
		position: relative;
		place-self: center;
	}
	.error-info {
		position: absolute;
		left: 5px;
		bottom: 5px;
		opacity: 1;
		transition: opacity 1s ease-out;
	}
	.inputs .snum-error {
		bottom: -8px;
	}
	.error-label {
		font-weight: 500;
		font-size: x-small;
		color: #b3004a;
	}
	.error-label::before {
		content: '*';
	}
	.form-container-label {
		margin-top: auto;
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
	.form-progress-steps li.activated:last-child::after {
		width: 50%;
	}
	.form-progress-steps li.activated span,
	.form-progress-steps li.active span {
		background-color: var(--upcolor_maroon);
		color: #ffffff;
	}
	.form-progress-steps li.activated::after,
	.form-progress-steps li.active::after {
		background-color: var(--upcolor_maroon);
		border-color: var(--upcolor_maroon);
	}
	.form-progress-steps li.activated:first-child::after,
	.form-progress-steps li.active:first-child::after {
		left: 50%;
		width: 50%;
	}
	.form-progress-steps li.activated::after {
		width: 100%;
		border-color: var(--upcolor_maroon);
	}
	.form-progress-steps li.activated:last-child::after {
		left: 0;
	}
	.form-footer {
		margin-bottom: auto;
		padding: 0 calc(1em + 20px);
		grid-area: footer;
	}
	.form-buttons {
		display: flex;
		justify-content: space-between;
	}
	.form-buttons .btn {
		color: var(--upcolor_maroon);
		cursor: pointer;
		width: 10vw;
		padding: 0.5em 0;
		text-align: center;
		font-weight: 500;
		border-radius: 50vw;
		border: 2px solid var(--upcolor_maroon);
		background-color: transparent;
	}
	.form-buttons .btn:hover {
		background-color: var(--upcolor_maroon);
		color: white;
	}
	.form-buttons .btn:active {
		scale: 0.98;
	}
	.form-buttons .btn:focus-visible:not(:focus) {
		scale: 1;
	}
	.summary-container {
		margin-top: -25px;
		padding: 0 20px;
		height: 100%;
		overflow-y: scroll;
		margin-bottom: 10px;
	}
	.summary-grid {
		display: grid;
		grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
		padding: 0 10px;
		row-gap: 5px;
		font-size: smaller;
		margin-bottom: 10px;
		align-items: center;
	}
	.summary-grid b {
		text-align: end;
	}
	.summary-grid > b,
	.summary-grid > div {
		padding: 5px 0;
	}
	.item {
		border-bottom: 1px solid var(--disabled);
	}
	.name {
		text-transform: capitalize;
	}
	.summary-total {
		padding-top: 5px;
		padding-bottom: 5px;
		border: 1px solid var(--disabled_text);
		border-width: 1px 0 1px 0;
	}
	.total-price {
		font-size: 11pt;
	}
	.confirm-label {
		margin-left: 30px;
		margin-right: 5px;
		font-size: small;
	}
	.confirm-label input[type='checkbox']::before {
		width: 14px;
		height: 14px;
		left: 30%;
	}
	label.confirm-label svg {
		left: 31%;
	}
	.confirm-label + span {
		font-size: smaller;
		color: #7a7a7a;
	}
	.confirm-label:has(input:checked) + span {
		color: black;
		font-weight: 500;
	}
	button {
		color: var(--upcolor_green);
		cursor: pointer;
		width: 10vw;
		padding: 0.5em 0;
		text-align: center;
		font-weight: 500;
		font-size: 1em;
		border-radius: 50vw;
		border: 2px solid var(--upcolor_green);
		background-color: transparent;
	}
	button:hover:not(:disabled) {
		background-color: var(--upcolor_green);
		color: white;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}
	.disabled {
		cursor: not-allowed;
		opacity: 0.3;
		pointer-events: none;
	}
</style>
