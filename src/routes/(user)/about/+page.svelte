<script>
	import bg_upb from '$lib/images/bg/bg-upb.webp';

	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('.oblePic').style.backgroundImage = 'url(' + bg_upb + ')';
	});
</script>

<svelte:head>
	<title>UP2GO: About Us</title>
</svelte:head>

<section class="abt-container">
	<div class="oblePic" />

	<div class="abt-title">
		<h1>OFFICE OF THE UNIVERSITY REGISTRAR</h1>
	</div>

	<div class="abt-line-container">
		<div class="abt-line" />
	</div>

	<div class="abt-content">
		<p>
			The University of the Registrar at the University of the Philippines Baguio serves as the
			central hub for all academic records and administrative functions related to students. We are
			committed to maintaining accurate and secure records, supporting the academic journey of
			students, and upholding the values of excellence and integrity. <br /><br />
			As the custodian of student records, our primary responsibilities include the registration and
			enrollment of students, managing class schedules, maintaining academic transcripts, and facilitating
			the graduation process. We strive to provide efficient and reliable services to students, faculty,
			and staff, ensuring that all processes adhere to the highest standards of professionalism and confidentiality.
		</p>
	</div>
</section>

<style>
	.abt-container {
		width: 100%;
		height: 100%;
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.oblePic {
		width: 100%;
		height: 420px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-size: cover;
		background-position-y: 40%;
		background-repeat: no-repeat;
	}

	.abt-container .abt-title {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.abt-container .abt-title h1 {
		font-size: 30px;
		font-weight: 700;
		line-height: 35px;
		color: #000;
		margin-top: 40px;
	}

	.abt-container .abt-line-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.abt-container .abt-line-container .abt-line {
		width: 180px;
		height: 0px;
		background-color: #850038;
		border: 3px solid #850038;
		margin: 10px 0px 20px 0px;
	}

	.abt-container .abt-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.abt-container .abt-content p {
		font-size: 14px;
		font-weight: 500;
		color: #000;
		text-align: center;
		line-height: 22px;
		padding: 0 100px;
		margin-top: 10px;
		margin-bottom: 20px;
	}
</style>
