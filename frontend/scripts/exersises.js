// Fetch data on page load
import Exercise from "./Exercise.js";

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
	const exerciseContainer = document.querySelector(".textRectangle");

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

		// Assuming you have an array of exercises in responseData
		responseData.forEach(function (exercise) {
			const exerciseInstance = new Exercise(exercise.name, exercise.type, exercise.muscle, exercise.difficulty, exercise.equipment, exercise.instructions);

			// Assuming you want to append each exercise to a container with class "textRectangle"
			const insertHTML = `
        <h1>${exerciseInstance.type}</h1>
        <h2>Hoeveel tijd je hebt</h2>
        <h2>${exerciseInstance.equipment}</h2>
        <div class="buttonBegin"><a href="#begin">Starten!</a></div>
      `;

			// Assuming you want to append each container to the body
			exerciseContainer.insertAdjacentHTML("beforeend", insertHTML);

			console.log(exerciseInstance);
			// document inpoppen
		});

		console.log(responseData);
		// Handle the response data as needed, for example, render it on the page.
	} catch (error) {
		console.error("Error submitting form:", error);
	}
});
