<script>
	import { json } from '@sveltejs/kit';
	let name = 'Joshua';
	let emailadd = '';
	async function email() {
		try {
			const response = await fetch('../api/email', {
				method: 'POST',
				body: JSON.stringify({ name, emailadd }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			emailadd = data;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="dashboard">Dashboard</div>
<button on:click={email}>Email</button>
{emailadd}
