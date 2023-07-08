<svelte:head>
	<title>UP2GO: Request Forms</title>
</svelte:head>

<div class="grid-container">
	<header class="form-header">Please fill all form fields to go to next step.</header>
	<aside class="aside-image"><img src="" alt="" /></aside>
	<main class="form-main">
		<form method="POST">
			<!-- personal information -->
			<fieldset>
				<legend>Personal Information</legend>
				<label for="fname">First Name</label>
				<input type="text" id="fname" name="fname" required autocomplete="off" />
				<label for="fname">Middle Name</label>
				<input type="text" id="mname" name="mname" placeholder="Optional" autocomplete="off" />
				<label for="fname">Last Name</label>
				<input type="text" id="lname" name="lname" required autocomplete="off" />
				<label for="fname">Student Number</label>
				<input type="number" id="snum" name="snum" required autocomplete="off" />
				<label for="fname">Email</label>
				<input type="email" id="email" name="email" required autocomplete="off" />
				<label for="fname">Year Level</label>
				<select name="yearLevel" id="yearLevel">
					<option disabled selected value="">Current Year Level</option>
					<option value="firstYear">First Year</option>
					<option value="secondYear">Second Year</option>
					<option value="thirdYear">Third Year</option>
					<option value="fourthYear">Fourth Year</option>
					<option value="graduate">Graduate Student</option>
					<option value="alumni">Alumni</option>
				</select>
				<label for="fname">For Scholarship</label>
				<input type="checkbox" id="scholarship" name="scholarship" />
			</fieldset>
			<button>Submit</button>
		</form>
	</main>
	<footer class="form-footer"><a href="">Next</a><a href="">Previous</a></footer>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px 1fr 100px;
		grid-template-areas: 'aside header' 'aside main' 'aside footer';
		gap: 10px;
		height: calc(100vh - 73.8px);
	}
	.aside-image {
		background-color: rgb(158, 173, 186);
		grid-area: aside;
	}
	.form-header {
		margin-top: auto;
		text-align: center;
		color: grey;
		grid-area: header;
	}
	.form-main {
		background-color: rgb(158, 173, 186);
		grid-area: main;
	}
	.form-footer {
		margin-bottom: auto;
		background-color: rgb(158, 173, 186);
		grid-area: footer;
	}
</style>
