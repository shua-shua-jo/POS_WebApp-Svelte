<script>
	export let data;
</script>

<h1>User Info</h1>
{#each data.user as data, i}
	{#if i < 1}
		{@const user = data.usersTable}
		{user.id}
		{user.first_name + user.middle_name + user.last_name}
		{user.email}
		{user.student_number}
		{user.year_level}
		{user.is_scholar}
		{user.purpose}
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
{/each}
