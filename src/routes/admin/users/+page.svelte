<script>
	import { onMount } from 'svelte';
	import { refresh, success, sending } from '$lib/toast/themes.js';
	import { toast } from '@zerodevx/svelte-toast';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';

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

	$: if (showPanel) {
		userData = userData;
		documentData = documentData;
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

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		data.usersData = data.usersData.sort(sort);
	};

	let updated = false;

	async function updateData() {
		// toast.pop();
		const date = new Date().toLocaleDateString();
		const time = new Date().toLocaleTimeString();

		showPanel = false;
		updated = true;

		await refresh(time);

		const response = await fetch('/admin/database');

		if (response.ok) {
			const update = await response.json();
			setTimeout(async () => {
				data = { usersData: update.usersData, requestsData: update.requestsData };
				updated = false;
			}, 2000);
			console.log('Updating data @', date + ', ', time);
		}
	}

	let showPanel = false;
	let userData = [];
	let documentData = [];
	let prevUserDataId;

	let deleteClicked = false;
	let deleteUser = [];

	onMount(async () => {
		setInterval(async () => {
			toast.pop();
			const date = new Date().toLocaleDateString();
			const time = new Date().toLocaleTimeString();

			updated = true;
			await refresh(time);

			const response = await fetch('/admin/database');
			if (response.ok) {
				const update = await response.json();
				setTimeout(async () => {
					data = { usersData: update.usersData, requestsData: update.requestsData };
					updated = false;
				}, 2000);
				console.log('Updating data @', date + ', ', time);
			}
		}, 600000);
	});
</script>

<svelte:head>
	<title>UP2GO: Admin | Users</title>
</svelte:head>

<!-- THIS CLOSES PANEL WHEN CLICKED OUTSIDE -->
<!-- <svelte:body
	on:click={(event) => {
		const className = event.target.className;
		if (showPanel && !className.includes('id-btn') && !className.includes('panel-wrapper')) {
			showPanel = false;
		}
	}}
/> -->

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
				<tr class="user-rows" animate:flip={{ duration: 300 }}>
					<td>
						<button
							on:click={() => {
								userData.length = 0;
								documentData.length = 0;
								for (var i = 0; i < data.requestsData.length; i++) {
									const id = data.requestsData[i].userId;
									if (user.id == id) {
										documentData.push(data.requestsData[i]);
									}
								}

								userData.push(user);
								if (prevUserDataId !== userData[0].id) {
									showPanel = false;
									prevUserDataId = userData[0].id;
									setTimeout(() => {
										showPanel = true;
									}, 300);
								} else {
									showPanel = true;
								}
							}}
							class="id-btn"
						>
							{user.id}
						</button>
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
									{#each data.requestsData as document}
										{#if user.id == document.userId}
											<li>{document.document}</li>
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
								user.request_approved = true;
								const id = sending('approval');
								return async ({ result, update }) => {
									toast.pop(id);
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
							<input type="hidden" name="fname" value={user.first_name} />
							<input type="hidden" name="email" value={user.email} />
							<button
								class="approve-btn"
								aria-label="Request Approved"
								disabled={user.request_approved == true}
							>
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
								user.documents_approved = true;
								const id = sending('verification');
								return async ({ result, update }) => {
									toast.pop(id);
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
							<input type="hidden" name="fname" value={user.first_name} />
							<input type="hidden" name="email" value={user.email} />
							<input type="hidden" name="emailId" value={user.email_id} />
							<button
								class:disabled={!user.request_approved && !user.documents_approved}
								aria-label="Requirements Verified"
								disabled={user.documents_approved}
							>
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
					<td
						><form
							action="?/paid"
							method="POST"
							use:enhance={() => {
								user.request_paid = true;
								const id = sending('payment');
								return async ({ result, update }) => {
									toast.pop(id);
									if (result.status === 200) {
										await update();
										await success(
											`<b>Request Paid!</b><br/><small>Email has been sent to ${user.email}</small>`
										);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<input type="hidden" name="fname" value={user.first_name} />
							<input type="hidden" name="email" value={user.email} />
							<button
								class:disabled={!user.request_approved || !user.documents_approved}
								aria-label="Request Paid"
								disabled={user.request_paid}
							>
								{#if user.request_paid}
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92c-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93c-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68v-2M4.26 5.67A9.885 9.885 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9L4.26 5.67M15.5 8.5l-4.88 4.88l-2.12-2.12l-1.06 1.06l3.18 3.18l5.94-5.94L15.5 8.5M2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8.002 8.002 0 0 1 4.06 13h-2m5.04 5.37l-1.43 1.37A9.994 9.994 0 0 0 11 22v-2a8.002 8.002 0 0 1-3.9-1.63Z"
										/></svg
									>
									<span>Paid</span>
								{:else}
									<span class="loader" />
									Pending
								{/if}
							</button>
						</form></td
					>
					<td>
						<form
							action="?/available"
							method="POST"
							use:enhance={() => {
								user.request_available = true;
								const id = sending('availability');
								return async ({ result, update }) => {
									toast.pop(id);
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
							<input type="hidden" name="fname" value={user.first_name} />
							<input type="hidden" name="email" value={user.email} />
							<button
								class:disabled={!user.request_paid}
								aria-label="Request Available"
								disabled={user.request_available}
							>
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
								const id = sending('data');
								return async ({ result, update }) => {
									toast.pop(id);
									if (result.status === 200) {
										await update();
										await success(
											`<b>Record deleted successfully.</b><br/><small>Receipt has been sent to ${user.email}!<small/>`
										);
									}
								};
							}}
						>
							<button
								class="finish-btn"
								class:disabled-finish={!user.request_available}
								aria-label="Finish"
							>
								<input type="hidden" name="id" value={user.id} />
								<input type="hidden" name="fname" value={user.first_name} />
								<input type="hidden" name="mname" value={user.middle_name} />
								<input type="hidden" name="lname" value={user.last_name} />
								<input type="hidden" name="snum" value={user.student_number} />
								<input type="hidden" name="email" value={user.email} />
								<input type="hidden" name="scholarship" value={user.scholarship} />
								<input type="hidden" name="totalPrice" value={user.total_price} />
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
						<button
							class="delete-btn"
							aria-label="Delete"
							on:click={() => {
								deleteUser.length = 0;
								deleteClicked = true;
								deleteUser.push(user);
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
								/></svg
							>
						</button>
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
								<option value={5}>5</option>
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
	{#if showPanel}
		<div class="side-panel" transition:slide={{ duration: 300, easing: quintInOut, axis: 'x' }}>
			<div class="panel-wrapper">
				{#each userData as user}
					<button
						class="close-btn"
						on:click={() => {
							showPanel = false;
							userData.length = 0;
							documentData.length = 0;
						}}
						aria-label="Close Side Panel"
						title="Close Panel"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m11.71 15.29l2.59-2.59a.996.996 0 0 0 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z"
							/></svg
						>
					</button>
					<div class="panel-data">
						<h3>Request No. {user.id}</h3>
						<div class="wrapper">
							<h4>User Info</h4>
							<div class="user-grid">
								<p class="user-info">
									<b>Name: </b>{user.first_name + ' ' + user.middle_name + ' ' + user.last_name}
								</p>
								<p><b>Student Number: </b>{user.student_number}</p>
								<div class="row-border" />
								<p><b>Email: </b>{user.email}</p>
								<p><b>Year Level: </b>{user.year_level}</p>
								<div class="row-border" />
								<p><b>Scholarship: </b>{user.scholarship ? 'Yes' : 'No'}</p>
								<p><b>Purpose: </b>{user.purpose}</p>
							</div>
						</div>
						<div class="wrapper">
							<h4>Documents Requested</h4>
							<div class="list" role="list">
								{#each documentData as document, i}
									<p>{document.document} - PHP {document.price}</p>
									{#if i % 2 !== 0 && i < documentData.length - 1}
										<div class="row-border" />
									{/if}
								{/each}
							</div>
							<div class="document-total-price"><b>Total Price: </b>PHP {user.total_price}</div>
							<div><b>Payment Method: </b>{user.payment_method}</div>
						</div>
						<!-- <div class="wrapper">
							<h4>Requirements Status</h4>
							<div class="req-grid" />
						</div> -->
						<div class="wrapper">
							<h4>Request Status</h4>
							<div class="bool-grid">
								<div>
									{#if user.request_approved}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#0e6021"
												d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
											/></svg
										>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#850038"
												d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
											/></svg
										>
									{/if}
									Request Approved
								</div>
								<div>
									{#if user.documents_approved}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#0e6021"
												d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
											/></svg
										>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#850038"
												d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
											/></svg
										>
									{/if}
									Requirements Verified
								</div>
								<div>
									{#if user.request_paid}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#0e6021"
												d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
											/></svg
										>
										Request Paid @ {user.payment_date}
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#850038"
												d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
											/></svg
										>
										Request Paid
									{/if}
								</div>
								<div>
									{#if user.request_available}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#0e6021"
												d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
											/></svg
										>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											><path
												fill="#850038"
												d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
											/></svg
										>
									{/if}
									Requirements Available
								</div>
							</div>
						</div>
					</div>
					<a href="/admin/users/{user.id}" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z"
							/>
						</svg>
						Open in New Tab
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

{#if deleteClicked}
	<div class="modal-container">
		<div class="delete-modal">
			<div class="modal-wrapper">
				<button
					class="close-modal"
					on:click={() => {
						deleteClicked = false;
					}}
					><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
						/></svg
					></button
				>
				<form
					action="?/delete"
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.status === 200) {
								await update();
								deleteClicked = false;
								await success(
									`<b>Record deleted successfully.</b><br/><small>Reason has been sent to ${deleteUser[0].email}!<small/>`
								);
							}
						};
					}}
				>
					<input type="hidden" name="id" value={deleteUser[0].id} />
					<input type="hidden" name="fname" value={deleteUser[0].first_name} />
					<input type="hidden" name="email" value={deleteUser[0].email} />
					<div>Confirm Delete</div>
					<label for="reason">Reason</label>
					<input type="text" name="reason" id="reason" required />
					<button type="submit">Delete</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.container {
		margin: 3em 5em;
	}
	.container > button {
		appearance: none;
		display: flex;
		justify-content: space-between;
		color: white;
		background-color: var(--blue_accent);
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
	.side-panel {
		position: fixed;
		padding: 1em 0;
		/* top: 73.8px; */
		top: 0;
		bottom: 0;
		height: 100%;
		/* height: calc(100% - 73.8px); */
		background: transparent;
		right: 0;
		margin: auto;
		width: 40vw;
		z-index: 10;
	}
	.panel-wrapper {
		position: relative;
		border-radius: 10px 0 0 10px;
		background-color: #efefef;
		/* border-top: 1px solid;
		border-bottom: 1px solid;
		border-left: 1px solid;
		border-color: var(--upcolor_maroon); */
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
			rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
			rgba(0, 0, 0, 0.09) 0px -3px 5px;
		height: 100%;
		padding: 1em;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.panel-wrapper button {
		position: absolute;
		margin-top: -1.2em;
		margin-left: -1.2em;
		border-radius: 10px 0 0 10px;
		background: var(--disabled);
		color: black;
		height: 100%;
		cursor: pointer;
		appearance: none;
		border: 0;
	}
	.panel-wrapper button:hover {
		background-color: var(--disabled_text);
	}
	.panel-data {
		padding-left: 1em;
	}
	.panel-data h3 {
		padding: 1em;
		color: white;
		background-color: var(--upcolor_maroon);
		border-radius: 10px;
		text-transform: uppercase;
	}
	.panel-data > .wrapper {
		padding: 5px;
		margin: 1em 0;
		/* border: 1px solid var(--upcolor_maroon); */
		border-radius: 10px;
		font-size: small;
	}
	.panel-data > .wrapper h4 {
		font-size: medium;
		color: black;
		margin-bottom: 10px;
		border-bottom: 2px solid var(--upcolor_maroon);
	}
	.row-border {
		border-top: 1px solid #00000022;
		grid-column: 1 / 3;
	}
	.panel-data > .wrapper .list {
		display: grid;
		font-size: 9pt;
		list-style: none;
		grid-template-columns: auto auto;
		/* grid-template-rows: repeat(9, auto); */
		grid-gap: 0.5em;
	}
	.document-total-price {
		position: relative;
		margin-top: 2em;
	}
	.document-total-price::before {
		content: '';
		position: absolute;
		top: -10px;
		width: 100%;
		background-color: black;
		height: 1px;
	}
	.user-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5em;
	}
	.bool-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
	}
	.bool-grid div {
		display: flex;
		justify-content: start;
		gap: 5px;
		align-items: center;
	}
	.panel-wrapper a {
		position: absolute;
		bottom: 1em;
		width: 566.4px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		font-size: small;
		color: var(--upcolor_maroon);
		background-color: transparent;
		border: 2px solid var(--upcolor_maroon);
		margin-left: 1.2em;
		padding: 0.5em 0;
		border-radius: 10px;
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
		margin: 0 auto;
	}
	form button:disabled {
		background-color: var(--upcolor_green);
		cursor: default;
	}
	form button.disabled {
		pointer-events: none;
		background-color: var(--disabled_text);
		color: var(--disabled);
	}
	form button:is(.disabled-finish) {
		pointer-events: none;
		color: var(--disabled_text);
		border-color: var(--disabled_text);
	}
	form:has(button.disabled),
	form:has(button:is(.disabled-finish)) {
		cursor: not-allowed;
	}
	form button:not(.delete-btn) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		padding: 0.5em 1em;
		border-radius: 50vw;
	}
	button.finish-btn {
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
	button:is(.disabled-finish) svg {
		color: var(--disabled_text);
	}
	.delete svg {
		color: var(--upcolor_maroon);
	}
	.user-rows:hover {
		background-color: var(--disabled);
	}
	.user-rows > td > button {
		cursor: pointer;
		font-weight: 600;
		color: var(--blue_accent);
		background-color: transparent;
		border: 0;
	}
	.user-rows > td > button:active {
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
		background-color: #fff;
		position: absolute;
		left: 0;
		top: 0;
		animation: animloader 2s linear infinite;
	}
	.loader::after {
		animation-delay: 1s;
	}
	button:is(.disabled) .loader::after,
	button:is(.disabled) .loader::before {
		background-color: var(--disabled);
		animation: none;
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
	.modal-container {
		width: 100%;
		height: 100%;
		background-color: rgba(128, 128, 128, 0.279);
		backdrop-filter: blur(1px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0 auto;
		position: fixed;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 300px;
		width: 500px;
		background-color: white;
	}
	.close-modal {
		appearance: none;
		border: none;

		cursor: pointer;
	}
</style>
