<script>
	import bg_upb from '$lib/images/bg/bg-upb.webp';
</script>

<svelte:head>
	<title>UP2GO: About Us</title>
</svelte:head>

<section class="abt-container">
	<div class="oblePic">
		<img src={bg_upb} alt="UPB Oble Background" />
	</div>

	<div class="abt-title">
		<h1>OFFICE OF THE UNIVERSITY REGISTRAR</h1>
	</div>

	<div class="line-container">
		<div class="line" />
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
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		background-color: #fafafa;
		height: calc(100vh - 73.8px);
	}

	.oblePic {
		/* display: block; */
		width: 100%;
		height: 420px;
		overflow: hidden;
	}

	.oblePic > img {
		width: inherit;
		height: inherit;
		object-fit: cover;
		object-position: right 45%;
	}

	.abt-container .abt-title {
		text-align: center;
	}

	.abt-container .abt-title h1 {
		font-size: 30px;
		font-weight: 700;
		line-height: 35px;
		color: #000;
		margin-top: 40px;
	}

	.abt-container .abt-content p {
		font-size: 14px;
		font-weight: 500;
		color: #000;
		text-align: center;
		line-height: 22px;
		padding: 0 100px;
		margin-bottom: 20px;
	}
</style>
