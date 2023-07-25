<script>
	import { Heading, Section, Preview, Container, Button, Hr, Html, Text } from 'svelte-email';

	export let data;

	const container = {
		textAlign: 'center',
		margin: '0 auto'
	};
	const section = {
		backgroundColor: '#850038',
		textAlign: 'center'
	};

	const heading = {
		color: 'white'
	};

	const greetings = {
		color: 'black',
		margin: '20px 0'
	};

	const hr = {
		borderColor: '#8e8e8e',
		marginTop: '20px'
	};

	const button = {
		alignItems: 'center',
		appearance: 'button',
		backgroundColor: '#0e6021',
		borderRadius: '8px',
		borderStyle: 'none',
		boxSizing: 'border-box',
		color: '#fff',
		cursor: 'pointer',
		textTransform: 'uppercase',
		display: 'flex',
		flexDirection: 'row',
		flexShrink: '0',
		fontSize: '100%',
		lineHeight: '1.15',
		fontWeight: 'bold',
		margin: '0',
		padding: '10px 21px',
		textAlign: 'center',
		textTransform: 'none',
		userSelect: 'none',
		touchAction: 'manipulation'
	};

	const footer = {
		color: '#8e8e8e',
		fontSize: 'x-small'
	};
</script>

<Html lang="en">
	<Preview preview={'Please upload the required documents.'} />
	<Container style={container}>
		<Section style={section}>
			<Heading as="h1" style={heading}>UP 2 GO</Heading>
		</Section>
		<Text style={greetings}>
			Hi, {data.name}!
		</Text>
		{#if data.emailType == 'invoice'}
			<Button style={button} href="http://localhost:5173/upload-requirements/{data.request_number}">
				Upload Here
			</Button>
		{/if}
		<Hr style={hr} />
		<Text style={footer}>&#169; 2023 OUR UPB. All rights reserved.</Text>
	</Container>
</Html>
