<script>
	import { onMount } from 'svelte';
	import { refresh, success } from '$lib/toast/themes.js';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let data;

	let rowsPerPage = 10;
	let currentPage = 0;

	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		weekday: 'short',
		hour12: false,
		timeZone: 'UTC'
	};

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, data.usersData.length);
	$: slice = data.usersData.slice(start, end);
	$: lastPage = Math.max(Math.ceil(data.usersData.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}

	// Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = { col: 'id', ascending: true };

	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}
		console.log(sortBy.ascending);

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		data.usersData = data.usersData.sort(sort);
	};

	let updated = false;

	async function updateData() {
		updated = true;
		await refresh();
		const response = await fetch('/admin/database');

		if (response.ok) {
			const update = await response.json();
			setTimeout(async () => {
				data = { usersData: update.usersData, requestsData: update.requestsData };
				updated = false;
			}, 2000);
			console.log(new Date().toLocaleString('fil-PH'));
		}
	}

	onMount(async () => {
		setInterval(async () => {
			const response = await fetch('/admin/database');
			if (response.ok) {
				const update = await response.json();
				await refresh();
				console.log(new Date().toLocaleString('fil-PH'));
				data = { usersData: update.usersData, requestsData: update.requestsData };
			}
		}, 600000);
	});
</script>

<svelte:head>
	<title>UP2GO: Admin | Users</title>
</svelte:head>

<div class="container">
	<button aria-label="Update Data" on:click={updateData}>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1c-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8h1.5z"
			/>
		</svg>
		Update Data
	</button>
	<table>
		<thead>
			<tr>
				<th on:click={sort('id')}>
					<div class="sortable">
						ID
						<span class:showSortBtn={sortBy.col == 'id'}
							><svg
								class:rotate={!sortBy.ascending && sortBy.col == 'id'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"><path d="M13 18v-6h5l-6-7l-6 7h5v6z" fill="currentColor" /></svg
							>
						</span>
					</div>
				</th>
				<th on:click={sort('student_number')}>
					<div class="sortable">
						User Info
						<span class:showSortBtn={sortBy.col == 'student_number'}>
							<svg
								class:rotate={!sortBy.ascending && sortBy.col == 'student_number'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"><path d="M13 18v-6h5l-6-7l-6 7h5v6z" fill="currentColor" /></svg
							>
						</span>
					</div>
				</th>
				<th>Requested Documents</th>
				<th>Remarks</th>
				<th on:click={sort('total_price')}>
					<div class="sortable">
						Total Price
						<span class:showSortBtn={sortBy.col == 'total_price'}>
							<svg
								class:rotate={!sortBy.ascending && sortBy.col == 'total_price'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"><path d="M13 18v-6h5l-6-7l-6 7h5v6z" fill="currentColor" /></svg
							>
						</span>
					</div>
				</th>
				<th on:click={sort('request_date')}>
					<div class="sortable">
						Date of Request
						<span class:showSortBtn={sortBy.col == 'request_date'}>
							<svg
								class:rotate={!sortBy.ascending && sortBy.col == 'request_date'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"><path d="M13 18v-6h5l-6-7l-6 7h5v6z" fill="currentColor" /></svg
							>
						</span>
					</div>
				</th>
				<th on:click={sort('payment_date')}>
					<div class="sortable">
						Date of Payment
						<span class:showSortBtn={sortBy.col == 'payment_date'}>
							<svg
								class:rotate={!sortBy.ascending && sortBy.col == 'payment_date'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"><path d="M13 18v-6h5l-6-7l-6 7h5v6z" fill="currentColor" /></svg
							>
						</span>
					</div>
				</th>
				<th>Request Approved</th>
				<th>Requirements Verified</th>
				<th>Request Paid</th>
				<th>Available for Claiming</th>
				<th />
				<th />
			</tr>
			<tr>
				<td colspan="100%">
					<div class:show={updated} class="indeterminate-progress-bar">
						<div class="indeterminate-progress-bar__progress" />
					</div>
				</td>
			</tr>
		</thead>
		<tbody>
			{#each slice as user (user.id)}
				<tr
					class="user-rows"
					out:slide={{ axis: 'x', duration: 250, key: user.id }}
					animate:flip={{ duration: 250 }}
				>
					<td>
						<a href="/admin/users/{user.id}" class="user-info">
							{user.id}
						</a>
					</td>
					<td>
						<div class="dropdown">
							<input type="checkbox" id="user{user.id}" />
							<label for="user{user.id}">{user.student_number}</label>
							<div class="user-drop contents">
								<ul role="list">
									<li>
										<b>Name:</b>
										<span class="user-info"
											>{user.first_name + ' ' + user.middle_name + ' ' + user.last_name}</span
										>
									</li>
									<li><b>Student Number:</b> {user.student_number}</li>
									<li><b>Email:</b> {user.email}</li>
									<li><b>Year Level:</b> {user.year_level}</li>
									<li><b>Scholarship:</b> {user.scholarship ? 'Yes' : 'No'}</li>
								</ul>
							</div>
						</div>
					</td>
					<td>
						<div class="dropdown">
							<input type="checkbox" id="docs{user.id}" />
							<label for="docs{user.id}">Documents</label>
							<div class="documents-drop contents">
								<ul role="list">
									{#each data.requestsData as request}
										{#if user.id == request.userId}
											<li>{request.document}</li>
										{/if}
									{/each}
								</ul>
							</div>
						</div>
					</td>
					<td
						><div class="dropdown">
							<input type="checkbox" id="remarks{user.id}" />
							<label for="remarks{user.id}">Remarks</label>
							<div class="remarks-drop contents">
								<ul role="list">
									<li><b>Purpose:</b> {user.purpose}</li>
									<li><b>Payment Method:</b> {user.payment_method}</li>
								</ul>
							</div>
						</div></td
					>
					<td style="text-align: start;">PHP {user.total_price}</td>
					<td>{new Date(user.request_date).toLocaleString('en-US', options)}</td>
					<td>{user.payment_date ? user.payment_date : 'Not Paid'}</td>
					<td>
						<form
							action="?/approve"
							method="POST"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.status === 200) {
										await update();
										await success(
											`<b>Request Approved!</b><br/><small>Email has been sent to ${user.email}</small>`
										);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button aria-label="Request Approve" disabled={user.request_approved == true}>
								{#if user.request_approved}
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92c-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93c-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68v-2M4.26 5.67A9.885 9.885 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9L4.26 5.67M15.5 8.5l-4.88 4.88l-2.12-2.12l-1.06 1.06l3.18 3.18l5.94-5.94L15.5 8.5M2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8.002 8.002 0 0 1 4.06 13h-2m5.04 5.37l-1.43 1.37A9.994 9.994 0 0 0 11 22v-2a8.002 8.002 0 0 1-3.9-1.63Z"
										/></svg
									>
									<span>Approved</span>
								{:else}
									<span class="loader" />
									Pending
								{/if}
							</button>
						</form>
					</td>
					<td>
						<form
							action="?/verify"
							method="POST"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.status === 200) {
										await update();
										await success(
											`<b>Requirements Verified!</b><br/><small>Email has been sent to ${user.email}</small>`
										);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button aria-label="Request Approve" disabled={user.documents_approved == true}>
								{#if user.documents_approved}
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92c-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93c-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68v-2M4.26 5.67A9.885 9.885 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9L4.26 5.67M15.5 8.5l-4.88 4.88l-2.12-2.12l-1.06 1.06l3.18 3.18l5.94-5.94L15.5 8.5M2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8.002 8.002 0 0 1 4.06 13h-2m5.04 5.37l-1.43 1.37A9.994 9.994 0 0 0 11 22v-2a8.002 8.002 0 0 1-3.9-1.63Z"
										/></svg
									>
									<span>Verified</span>
								{:else}
									<span class="loader" />
									Pending
								{/if}
							</button>
						</form>
					</td>
					<td>{user.request_paid ? 'Paid' : 'Pending'}</td>
					<td>
						<form
							action="?/available"
							method="POST"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.status === 200) {
										await update();
										await success(
											`<b>Available for Claiming!</b><br/><small>Email has been sent to ${user.email}</small>`
										);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button aria-label="Request Approve" disabled={user.request_available == true}>
								{#if user.request_available}
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92c-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93c-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68v-2M4.26 5.67A9.885 9.885 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9L4.26 5.67M15.5 8.5l-4.88 4.88l-2.12-2.12l-1.06 1.06l3.18 3.18l5.94-5.94L15.5 8.5M2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8.002 8.002 0 0 1 4.06 13h-2m5.04 5.37l-1.43 1.37A9.994 9.994 0 0 0 11 22v-2a8.002 8.002 0 0 1-3.9-1.63Z"
										/></svg
									>
									<span>Available</span>
								{:else}
									<span class="loader" />
									Pending
								{/if}
							</button>
						</form>
					</td>
					<td class="finish">
						<form
							action="?/finish"
							method="POST"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.status === 200) {
										await update();
										await success(
											`<b>Record deleted successfully.</b><br/><small>Receipt has been sent to ${user.email}!<small/>`
										);
									}
								};
							}}
						>
							<button class="finish-btn" aria-label="Finish">
								<input type="hidden" name="id" value={user.id} />
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
									/></svg
								><span>Finish</span>
							</button>
						</form>
					</td>
					<td class="delete">
						<!-- CREATE DIALOG FOR REASON OF DELETION -->
						<!-- MOVE FORM TO THE DIALOG -->
						<form
							action="?/delete"
							method="POST"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.status === 200) {
										await update();
										await success(
											`<b>Record deleted successfully.</b><br/><small>Reason has been sent to ${user.email}!<small/>`
										);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button class="delete-btn" aria-label="Delete">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
									/></svg
								>
							</button>
						</form>
					</td>
				</tr>
			{:else}
				<tr class="empty-table">
					<td colspan="100%">No User Found</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="100%">
					<div class="pagination-wrapper">
						<div>
							<label for="rpp">Rows Per Page</label>
							<select name="row-pagination" id="rpp" bind:value={rowsPerPage}>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>
						</div>
						<div class="total">
							{start + 1}-{end} of {data.usersData.length}
						</div>
						<button
							class="pagination-icons"
							aria-label="First Page"
							action="first-page"
							title="First page"
							on:click={() => (currentPage = 0)}
							disabled={currentPage === 0}
							><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z"
								/></svg
							></button
						>
						<button
							class="pagination-icons"
							aria-label="Previous Page"
							action="prev-page"
							title="Prev page"
							on:click={() => currentPage--}
							disabled={currentPage === 0}
							><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" /></svg
							></button
						>
						<button
							class="pagination-icons"
							aria-label="Next Page"
							action="next-page"
							title="Next page"
							on:click={() => currentPage++}
							disabled={currentPage === lastPage}
							><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
								/></svg
							></button
						>
						<button
							class="pagination-icons"
							aria-label="Last Page"
							action="last-page"
							title="Last page"
							on:click={() => (currentPage = lastPage)}
							disabled={currentPage === lastPage}
							><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z"
								/></svg
							></button
						>
					</div>
				</td>
			</tr>
		</tfoot>
	</table>
</div>

<style>
	.container {
		margin: 3em 5em;
	}
	.container > button {
		appearance: none;
		display: flex;
		justify-content: space-between;
		color: white;
		background-color: #1911ee;
		border: none;
		border-radius: 0.5em;
		cursor: pointer;
		align-items: center;
		gap: 1em;
		padding: 5px 1em;
		margin-bottom: 10px;
	}
	.container > button:active {
		scale: 0.95;
	}
	table {
		border-radius: 20px;
	}
	table,
	th,
	td {
		border-collapse: collapse;
		font-size: smaller;
		padding: 1em 10px;
		font-weight: bold;
	}
	td {
		text-align: center;
		border-bottom: 1px solid black;
	}

	thead {
		color: white;
		text-transform: uppercase;
		background-color: var(--upcolor_maroon);
	}
	th:nth-child(1) {
		border-radius: 20px 0px 0 0;
	}

	th:nth-last-child(1) {
		border-radius: 0px 20px 0 0;
	}
	tfoot td {
		border-radius: 0 0 20px 20px;
		border: 0;
	}

	thead tr th {
		padding: 1.5em 10px;
	}
	th:has(.sortable) {
		cursor: pointer;
	}
	.sortable {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.sortable span {
		color: var(--disabled_text);
		border-radius: 50vw;
		visibility: hidden;
		opacity: 0;
	}
	.sortable:hover span,
	.sortable .showSortBtn {
		visibility: visible;
		opacity: 1;
	}
	.sortable .showSortBtn {
		color: white;
	}
	.sortable span:hover {
		background-color: rgba(255, 255, 255, 0.239);
	}
	.sortable .rotate {
		transform: rotate(180deg);
	}
	.empty-table {
		font-size: medium;
		text-transform: uppercase;
	}
	form button {
		cursor: pointer;
		text-transform: uppercase;
		appearance: none;
		font-weight: bold;
		border: 0;
		color: white;
		background-color: var(--upcolor_maroon);
		font-size: 9pt;
	}
	form button:disabled {
		background-color: var(--upcolor_green);
		cursor: default;
	}
	form button:not(.delete-btn) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		padding: 0.5em 1em;
		border-radius: 50vw;
	}
	form button:is(.finish-btn) {
		border: 2px solid var(--upcolor_green);
		color: var(--upcolor_green);
	}
	:is(.finish, .delete) button {
		background: transparent;
	}
	.delete-btn {
		border: 0;
	}
	td:has(.indeterminate-progress-bar) {
		padding: 0;
		border: 0;
		outline: 0;
	}
	td .show {
		display: block;
	}
	.indeterminate-progress-bar {
		/* Color */
		background-color: white;
		display: none;

		/* Size */
		height: 0.5em;

		position: relative;
		overflow: hidden;
	}

	.indeterminate-progress-bar__progress {
		/* Color */
		background-color: #3b82f6;

		/* Absolute position */
		position: absolute;
		bottom: 0;
		top: 0;
		width: 50%;

		/* Move the bar infinitely */
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
		animation-name: indeterminate-progress-bar;
	}

	@keyframes indeterminate-progress-bar {
		from {
			left: -50%;
		}
		to {
			left: 100%;
		}
	}
	.finish svg {
		color: var(--upcolor_green);
	}
	.delete svg {
		color: var(--upcolor_maroon);
	}
	.user-rows:hover {
		background-color: var(--disabled);
	}
	.user-rows > td > a {
		color: #1911ee;
	}
	.user-rows > td > a:is(:active, :focus) {
		color: var(--upcolor_maroon);
	}
	.user-info {
		text-transform: capitalize;
	}
	.dropdown {
		width: 100%;
		color: var(--upcolor_maroon);
		border-radius: 50vw;
	}
	.dropdown label {
		display: flex;
		border: 2px solid var(--upcolor_maroon);
		border-radius: 50vw;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		user-select: none;
		background: #fff;
		font-weight: bold;
		cursor: pointer;
		text-transform: uppercase;
	}
	.dropdown label::after {
		content: '\276E';
		padding: 0 0 0 10px;
		margin-bottom: 1.5px;
	}
	.dropdown .contents {
		pointer-events: none;
		position: absolute;
		display: none;
		color: var(--upcolor_maroon);
		background: white;
		border-radius: 10px;
		border: 2px solid var(--upcolor_maroon);
	}
	.dropdown input {
		position: absolute;
		opacity: 0;
		z-index: -1;
	}
	.dropdown input:checked + label {
		background: var(--upcolor_maroon);
		color: white;
	}
	.dropdown input:checked ~ .contents {
		display: block;
		padding: 1em;
		pointer-events: all;
		z-index: 1;
	}
	.dropdown input:checked + label::after {
		padding: 0;
		transform: rotate(-90deg);
		transition: transform 0.3s;
	}
	.contents ul {
		text-align: start;
		padding: 10px;
		font-weight: normal;
	}
	.documents-drop ul {
		font-weight: bold;
		list-style-type: '- ';
	}
	.remarks-drop ul,
	.user-drop ul {
		list-style: none;
	}

	tfoot {
		font-size: medium;
		color: white;
		background-color: var(--upcolor_maroon);
	}
	.pagination-wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
	}
	.pagination-wrapper select {
		margin: 0 1em 0 0.5em;
		padding: 0 1em;
		border: 2px solid white;
		color: white;
		outline: 0;
		font-weight: bold;
		background: transparent;
	}
	.pagination-wrapper select option {
		font-weight: bold;
		color: black;
	}
	.pagination-icons {
		background: none;
		color: white;
		width: max-content;
		height: auto;
		border: 0;
		border-radius: 50%;
	}
	.pagination-icons:disabled {
		color: var(--disabled_text);
	}
	.pagination-icons:hover:not(:disabled) {
		background-color: rgba(255, 255, 255, 0.239);
	}
	.loader {
		width: 18px;
		height: 18px;
		display: inline-block;
		position: relative;
	}
	.loader::after,
	.loader::before {
		content: '';
		width: inherit;
		height: inherit;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		left: 0;
		top: 0;
		animation: animloader 2s linear infinite;
	}
	.loader::after {
		animation-delay: 1s;
	}

	@keyframes animloader {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
