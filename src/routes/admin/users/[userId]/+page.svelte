<script>
	export let data;

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
</script>

<svelte:head>
	<title>UP2GO: Admin | Show User</title>
</svelte:head>

<div class="background">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
		><path
			fill="#850038"
			fill-opacity="1"
			d="M0,64L48,53.3C96,43,192,21,288,10.7C384,0,480,0,576,32C672,64,768,128,864,128C960,128,1056,64,1152,48C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		/></svg
	>
</div>

<div class="container">
	<div class="navigation">
		<div class="text">Users &#x276F; User &#x276F; <span>{data.user.id}</span></div>
	</div>
	<div class="wrapper-container">
		<div class="wrapper">
			<div class="header">
				<div class="text">User | Request</div>
			</div>
			<div class="content">
				<div class="boxed">
					<h3>User Info</h3>
					<div class="user-info">
						<p><b>Request No. </b><span class="input">{data.user.id}</span></p>
						<p>
							<b>Name: </b><span class="input">
								{data.user.first_name + ' ' + data.user.middle_name + ' ' + data.user.last_name}
							</span>
						</p>
						<p><b>Email: </b><span class="input">{data.user.email}</span></p>
						<p><b>Student Number: </b><span class="input">{data.user.student_number}</span></p>
						<p><b>Year Level: </b><span class="input">{data.user.year_level}</span></p>
					</div>
				</div>
				<div class="boxed">
					<h3>Request/s Info</h3>
					<div class="request-info">
						{#each data.request as request}
							<p>{request.id}</p>
							<p>{request.document}</p>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="wrapper">
			<div class="header">
				<div class="text">Requirement | Payment</div>
			</div>
			<div class="content">
				<div class="boxed">
					<h3>Requirement/s Info</h3>
					<div class="requirement-info">
						{#each data.requirement as requirement, i}
							<div class="req-container">
								{#if requirement.file_name !== null}
									<p><b>Requirement ID: </b>{requirement.id}</p>
									<p>
										<b>Upload Date: </b>{new Date(requirement.upload_date).toLocaleString(
											'en-US',
											options
										)}
									</p>
									{#each data.pdfReqs as pdf}
										{#if pdf.id == requirement.id}
											<p>
												<b>File Name: </b><a href={pdf.url} target="_blank"
													>{requirement.file_name}</a
												>
											</p>
											<p><b>Requirement Type: </b>{requirement.requirement_type}</p>
											<div class="pdf-wrapper">
												<div class="pdf-viewer">
													<button
														class="btn{pdf.id}"
														on:click={() => {
															const embPdf = document.querySelector(`.pdf${pdf.id}`);
															const btnPdf = document.querySelector(`.btn${pdf.id}`);
															if (!embPdf.className.includes('hidden')) {
																embPdf.classList.add('hidden');
																embPdf.classList.remove('show');
																btnPdf.textContent = 'Show Preview';
															} else {
																embPdf.classList.remove('hidden');
																embPdf.classList.add('show');
																btnPdf.textContent = 'Close Preview';
															}
														}}>Show Preview</button
													>
													<embed
														class="pdf{pdf.id} hidden"
														src="{pdf.url}#toolbar=0&navpanes=0"
														type="application/pdf"
														width="500px"
														height="500px"
														aria-label={pdf.req_type}
													/>
												</div>
											</div>
										{/if}
									{/each}
								{:else}
									<p>For <b>TCG</b></p>
									<p><b>{requirement.requirement_type}: </b> {requirement.tcg_format}</p>
								{/if}
							</div>
						{:else}
							<div class="not-available">N/A</div>
						{/each}
					</div>
				</div>
				<div class="boxed">
					<h3>Payment Info</h3>
					<div class="payment-info">
						{#if data.payment !== null}
							<p>{data.payment.id}</p>
							<p>{data.payment.payment_date}</p>
						{:else}
							<div class="not-available">N/A</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.show {
		visibility: visible;
		opacity: 1;
		transition: all 0.3s ease-in-out;
	}
	.hidden {
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}
	.background {
		position: fixed;
		display: flex;
		height: 100%;
		width: 100%;
		bottom: 0;
		top: 0;
		z-index: -10;
	}
	.background svg {
		display: inline-block;
		align-self: flex-end;
		width: inherit;
	}
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		padding: 20px 0;
		align-items: center;
	}
	.container .navigation {
		user-select: none;
		width: 70vw;
		margin: 0 auto;
		color: var(--disabled_text);
	}
	.navigation .text {
		width: max-content;
	}
	.navigation .text span {
		border-bottom: 1px solid var(--disabled_text);
	}
	.wrapper-container {
		display: flex;
		flex-direction: row;
		gap: 5em;
		height: 100%;
		width: 100%;
		padding: 0 5em;
	}
	.wrapper {
		margin-top: 5em;
		width: 60vw;
	}
	.boxed {
		border: 1px solid var(--upcolor_maroon);
		margin: 1em 0;
		padding: 0 0.5em;
		border-radius: 10px;
	}
	.header .text {
		position: relative;
		font-size: 12pt;
		font-weight: bold;
		width: max-content;
		text-transform: uppercase;
		color: white;
		padding: 0.25em 1.5em;
		border-radius: 10px 10px 0 0;
		background-color: var(--upcolor_maroon);
	}
	.header .text::after {
		content: '';
		position: absolute;
		top: 0;
		left: 99%;
		bottom: 0;
		width: 100%;
		clip-path: polygon(
			0% 15%,
			1.1% 26.5%,
			2.3% 38%,
			3.6% 50%,
			5.3% 64.5%,
			6.9% 76.5%,
			8.8% 88%,
			11.7% 100.3%,
			0% 100.3%
		);
		background-color: var(--upcolor_maroon);
		z-index: 1;
	}
	.wrapper .content {
		padding: 1.5em;
		border-radius: 0 10px 10px 10px;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(2px);
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
		min-height: 50dvh;
	}
	h3 {
		font-weight: 900;
		text-transform: uppercase;
		text-align: center;
		padding: 0.5em 0;
		color: var(--upcolor_maroon);
	}
	.user-info {
		display: flex;
		flex-direction: column;
	}
	.user-info p {
		display: flex;
		flex-direction: column;
	}
	p {
		margin: 0.5em 0;
	}
	a {
		color: var(--blue_accent);
	}
	span.input {
		background-color: rgba(150, 150, 150, 0.292);
		padding: 0.25em 0.5em;
		border-radius: 5px;
	}
	.requirement-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
		margin-bottom: 0.5em;
	}
	.req-container {
		background-color: rgba(133, 0, 55, 0.15);
		border-radius: 10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 10pt;
	}
	.pdf-wrapper button {
		border-radius: 5px;
		padding: 0.5em 1em;
		border: 0;
		background-color: var(--upcolor_maroon);
		color: white;
		font-weight: 600;
		cursor: pointer;
	}
	.pdf-wrapper button:active {
		opacity: 0.95;
	}
	.pdf-wrapper {
		position: relative;
	}
	.pdf-viewer embed {
		position: absolute;
		top: 2.5em;
		z-index: 10;
	}
	.req-container:nth-of-type(odd) embed {
		left: 0;
	}
	.req-container:nth-of-type(even) embed {
		right: 0;
	}
	.not-available {
		user-select: none;
		font-weight: 500;
		font-size: 14pt;
		text-align: center;
		padding: 2em;
	}
</style>
