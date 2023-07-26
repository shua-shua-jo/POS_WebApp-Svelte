<script>
	export let data;
</script>

<div class="container">
	<div class="navigation"><div class="text">Users &#x276F; User</div></div>
	<div class="wrapper-container">
		<div class="wrapper">
			<div class="header">
				<div class="text">User Info</div>
			</div>
			<div class="content">
				{#each data.user as data, i}
					{#if i < 1}
						{@const user = data.usersTable}
						<div class="user-info">
							<b>Request No. {user.id}</b>
							{user.first_name + user.middle_name + user.last_name}
							{user.email}
							{user.student_number}
							{user.year_level}
							{user.is_scholar}
							{user.purpose}
						</div>
						{user.payment_method}
						{user.request_date}
						{user.payment_date}
						{user.request_paid}
						{user.request_approved}
						{user.documents_approved}
						{user.request_available}
						{user.total_price}
					{/if}
					{@const request = data.requestsTable}
					{request.id}
					{request.document}
					{request.price}
				{:else}
					User does not exist
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 73.8px);
		justify-content: center;
		padding: 20px 0;
		align-items: center;
	}
	.container .navigation {
		width: 70vw;
		margin: 0 auto;
	}
	.navigation .text {
		width: max-content;
	}
	.wrapper-container {
		display: flex;
		align-items: center;
		height: calc(90% - 21.6px);
	}
	.wrapper {
		width: 60vw;
	}
	.header .text {
		font-size: 12pt;
		font-weight: bold;
		width: max-content;
		text-transform: uppercase;
		color: white;
		padding: 0.25em 1.5em;
		border-radius: 10px 10px 0 0;
		background-color: var(--upcolor_maroon);
	}
	.wrapper .content {
		padding: 1.5em;
		border-radius: 0 10px 10px 10px;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
</style>
