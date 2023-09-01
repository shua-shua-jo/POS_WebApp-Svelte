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

	let showImg = false;
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
							<div class="req-container">
								<p><b>Request ID: </b>{request.id}</p>
								<p><b>Request Document: </b>{request.document}</p>
								<p>
									<b>Request Date: </b>{new Date(data.user.request_date).toLocaleString(
										'en-US',
										options
									)}
								</p>
								<p><b>Price: </b>PHP {request.price}.00</p>
							</div>
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
											{@const fileUrl = `/api/read-file?path=${pdf.url}&type=application/pdf`}
											<p>
												<b>File Name: </b><a href={fileUrl} target="_blank"
													>{requirement.file_name}</a
												>
											</p>
											<p><b>Requirement Type: </b>{requirement.requirement_type}</p>
											<div class="file-wrapper">
												<div class="file-viewer">
													<button
														class="btn{pdf.id} prev"
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
														title={pdf.pdf_name}
														src="{fileUrl}#toolbar=0&navpanes=0"
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
									<div>
										<p>For <b>TCG</b></p>
										<p><b>{requirement.requirement_type}: </b> {requirement.tcg_format}</p>
									</div>
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
							{@const imgUrl = `/api/read-file?path=${data.payURL}&type=image/*`}
							<div class="req-container">
								<p><b>Payment ID: </b>{data.payment.id}</p>
								<p>
									<b>Payment Date: </b>{new Date(data.user.payment_date).toLocaleString(
										'en-US',
										options
									)}
								</p>
								<p>
									<b>File Name: </b><a href={imgUrl} target="_blank">{data.payment.file_name}</a>
								</p>
								<div class="pay-wrapper">
									<button
										class="img-scale"
										on:click={() => {
											showImg = true;
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 24 24"
											><path
												fill="#fff"
												d="M15.85 3.85L17.3 5.3l-2.18 2.16c-.39.39-.39 1.03 0 1.42c.39.39 1.03.39 1.42 0L18.7 6.7l1.45 1.45a.5.5 0 0 0 .85-.36V3.5c0-.28-.22-.5-.5-.5h-4.29a.5.5 0 0 0-.36.85zm-12 4.3L5.3 6.7l2.16 2.18c.39.39 1.03.39 1.42 0c.39-.39.39-1.03 0-1.42L6.7 5.3l1.45-1.45A.5.5 0 0 0 7.79 3H3.5c-.28 0-.5.22-.5.5v4.29c0 .45.54.67.85.36zm4.3 12L6.7 18.7l2.18-2.16c.39-.39.39-1.03 0-1.42c-.39-.39-1.03-.39-1.42 0L5.3 17.3l-1.45-1.45a.5.5 0 0 0-.85.36v4.29c0 .28.22.5.5.5h4.29a.5.5 0 0 0 .36-.85zm12-4.3L18.7 17.3l-2.16-2.18c-.39-.39-1.03-.39-1.42 0c-.39.39-.39 1.03 0 1.42l2.18 2.16l-1.45 1.45a.5.5 0 0 0 .36.85h4.29c.28 0 .5-.22.5-.5v-4.29a.5.5 0 0 0-.85-.36z"
											/></svg
										>
									</button>
									<img
										src={imgUrl}
										alt={data.payment.file_name}
										width="100%"
										aria-label="Payment File Preview"
									/>
								</div>
							</div>
						{:else}
							<div class="not-available">N/A</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showImg}
	<div class="payment-img-container">
		<button
			on:click={() => {
				showImg = false;
			}}
			aria-label="Close button"
			title="Close Image"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
				/></svg
			>
		</button>
		<img
			class="payfile"
			src={data.payURL}
			alt={data.payment.file_name}
			aria-label="Payment File Preview"
		/>
	</div>
{/if}

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
	.request-info,
	.requirement-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em;
		margin-bottom: 0.5em;
	}
	.request-info .req-container {
		background-color: rgba(150, 150, 150, 0.292);
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
	.file-wrapper button.prev {
		border-radius: 5px;
		padding: 0.5em 1em;
		border: 0;
		background-color: var(--upcolor_maroon);
		color: white;
		font-weight: 600;
		cursor: pointer;
	}
	.file-wrapper button.prev:active {
		opacity: 0.95;
		scale: 0.97;
	}
	.file-wrapper {
		position: relative;
	}
	.file-viewer embed {
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
		grid-column: 1 / span 2;
	}
	.pay-wrapper {
		position: relative;
	}
	.pay-wrapper button {
		position: absolute;
		appearance: none;
		border: none;
		background-color: rgba(90, 90, 90, 0.7);
		border-radius: 0 0 0 5px;
		right: 0;
		cursor: pointer;
	}
	.pay-wrapper button:hover {
		opacity: 0.9;
	}
	.payment-img-container {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #26303887;
		backdrop-filter: blur(6px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.payment-img-container button {
		appearance: none;
		border: none;
		background-color: transparent;
		color: white;
		cursor: pointer;
		position: absolute;
		top: 1em;
		right: 1em;
	}
	img.payfile {
		width: 90dvw;
	}
</style>
