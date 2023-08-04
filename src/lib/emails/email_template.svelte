<script>
	import { Section, Preview, Container, Button, Hr, Html, Text } from 'svelte-email';

	export let data;

	const container = {
		textAlign: 'center',
		margin: '0 auto'
	};
	const section = {
		backgroundColor: '#850038',
		textAlign: 'center',
		borderRadius: '5px'
	};

	const invoice_section = {
		backgroundColor: '#d4d4d4',
		borderRadius: '20px',
		paddingBottom: '2em',
		margin: '0 0 2em 0'
	};

	const heading = {
		color: 'white',
		fontWeight: 'bolder',
		fontSize: '34pt',
		padding: '0.25em 1em'
	};

	const greetings = {
		color: 'black',
		margin: '2em 0',
		fontWeight: 'bold',
		fontSize: 'large',
		textTransform: 'uppercase'
	};
	const content = {
		fontSize: 'medium',
		marginBottom: '2em',
		padding: '0 1em',
		textAlign: 'left'
	};

	const hr = {
		borderColor: '#8e8e8e',
		marginTop: '2.5em'
	};

	const reason = {
		textAlign: 'center',
		margin: '2em 0',
		padding: '1em',
		backgroundColor: '#cccccc',
		borderRadius: '5px'
	};

	const req_header = {
		textAlign: 'left',
		fontWeight: 'bold',
		padding: '0 1em',
		margin: '1em 0 0.5em 0',
		fontSize: 'medium',
		color: 'black'
	};

	const req_content = {
		fontSize: 'small',
		lineHeight: '24px',
		margin: '0 2em',
		textAlign: 'left',
		fontWeight: '400',
		color: '#464646'
	};

	const button = {
		alignItems: 'center',
		appearance: 'button',
		backgroundColor: '#850038',
		borderRadius: '24px',
		borderStyle: 'none',
		boxSizing: 'border-box',
		color: '#fff',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		flexShrink: '0',
		fontSize: 'medium',
		lineHeight: '1.15',
		fontWeight: 'bold',
		padding: '1em 4em',
		textAlign: 'center',
		userSelect: 'none',
		touchAction: 'manipulation'
	};

	const footer = {
		color: '#8e8e8e',
		fontSize: 'x-small'
	};
</script>

<Html lang="en">
	<Preview preview={data.previewMsg} />
	<Container style={container}>
		<Section style={section}>
			<Text style={heading}>UP 2 GO</Text>
		</Section>
		<Text style={greetings}>
			Good Day, {data.name}!
		</Text>
		<Text style={content}>
			{data.contentMsg}
		</Text>
		{#if data.emailType == 'delete'}
			<Text style={reason}>
				{data.reason}
			</Text>
			<Text style={content}>Thank you!</Text>
		{/if}
		{#if data.emailType == 'invoice'}
			{#if data.req.length > 0}
				<Section style={invoice_section}>
					<Text style={req_header}>Requirements</Text>
					{#each data.req as req}
						<Text style={req_content}>
							&#x274D;&nbsp;{req}
						</Text>
					{/each}
				</Section>
				<Button
					style={button}
					href="http://localhost:5173/upload-requirements/{data.request_number}/{data.emailId}"
				>
					UPLOAD HERE
				</Button>
			{/if}
		{:else if data.emailType == 'verify'}
			<Button style={button} href="https://tinyurl.com/8b2c8sdy">Confirm Payment</Button>
		{/if}
		<Hr style={hr} />
		<Text style={footer}>&#169; 2023 OUR UPB. All rights reserved.</Text>
	</Container>
</Html>
