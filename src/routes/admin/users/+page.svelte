<script>
	export let data;
</script>

<h1 class="users">Users Table</h1>
{#each data.usersData as user}
	{user.id}
{/each}
<!-- {data.requestsData} -->
