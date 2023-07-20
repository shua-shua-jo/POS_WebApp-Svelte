<script>
	import { Heading, Section, Container, Button, Hr, Html, Text } from 'svelte-email';

	export let name = '';
	export let emailType = '';

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};
	const container = {
		textAlign: 'center'
	};
	const section = {
		backgroundColor: '#850038',
		textAlign: 'center'
	};

	const heading = {
		color: 'white'
	};

	const greetings = {
		color: 'black'
	};
</script>

<Html lang="en">
	<Section>
		<Container style={container}>
			<Section style={section}>
				<Heading as="h1" style={heading}>UP-2-Go</Heading>
			</Section>
			<Text style={greetings}>
				Hi, {name}!
			</Text>
			<Hr />
			{#if emailType == 'invoice'}
				<Button href="http://localhost:5173/upload_image">Visit Youtube</Button>
			{/if}
		</Container>
	</Section>
</Html>
