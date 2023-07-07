<script>
	import { Heading, Section, Container, Button, Hr, Html, Text } from 'svelte-email';

	export let name = 'Joshua';

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
			<Button href="youtube.com">Visit Youtube</Button>
		</Container>
	</Section>
</Html>
