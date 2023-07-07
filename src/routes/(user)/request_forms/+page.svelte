<svelte:head>
	<title>UP2GO: Request Forms</title>
</svelte:head>

<form method="POST">
	<input type="text" id="fname" name="fname" required autocomplete="off" />
	<label for="fname">First Name</label>
	<input type="text" id="mname" name="mname" placeholder="Optional" autocomplete="off" />
	<label for="fname">Middle Name</label>
	<input type="text" id="lname" name="lname" required autocomplete="off" />
	<label for="fname">Last Name</label>
	<input type="number" id="snum" name="snum" required autocomplete="off" />
	<label for="fname">Student Number</label>
	<input type="email" id="email" name="email" required autocomplete="off" />
	<label for="fname">Email</label>
	<select name="YearLevel" id="YearLevel">
		<option disabled selected value="">Current Year Level</option>
		<option value="firstYear">First Year</option>
		<option value="secondYear">Second Year</option>
		<option value="thirdYear">Third Year</option>
		<option value="fourthYear">Fourth Year</option>
		<option value="graduate">Graduate Student</option>
		<option value="alumni">Alumni</option>
	</select>
	<label for="fname">Year Level</label>
	<input type="checkbox" id="scholarship" name="scholarship" />
	<label for="fname">For Scholarship</label>
	<button>Submit</button>
</form>
