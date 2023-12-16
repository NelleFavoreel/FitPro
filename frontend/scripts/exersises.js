// Fetch data on page load
fetch("http://localhost:3000/showExercises", {
	method: "GET",
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
})
	.then((data) => data.json())
	.then(function (response) {
		console.log(response);
		// Handle the response data as needed, for example, render it on the page.
	})
	.catch(function (error) {
		console.error("Error fetching data:", error);
	});

// Add event listener to the form for handling submissions
const filter = document.querySelector("#exerciseFilter");
filter.addEventListener("submit", async (event) => {
	event.preventDefault();

	// Get filter values from the form
	const filterTime = document.querySelector("#filterTime").value;
	const filterGroup = document.querySelector("#filterSelect").value;
	const filterDifficulty = document.querySelector("#filterDifficulty").value;

	// Construct the URL with query parameters for the GET request
	const url = `http://localhost:3000/showExercises?time=${filterTime}&type=${filterGroup}&difficulty=${filterDifficulty}`;

	// Fetch data based on the filter values
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});

		if (!response.ok) {
			throw new Error("Server error");
		}

		const responseData = await response.json();
		console.log(responseData);
		// Handle the response data as needed, for example, render it on the page.
	} catch (error) {
		console.error("Error submitting form:", error);
	}
});
