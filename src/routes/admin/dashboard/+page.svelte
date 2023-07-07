<script>
	import { json } from '@sveltejs/kit';
	let name = 'Joshua';
	let emailadd = '';
	async function email() {
		const response = await fetch('/emails/hello', {
			method: 'POST',
			body: JSON.stringify({ name }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => (emailadd = data))
			.catch((err) => console.log(err));
	}
</script>
