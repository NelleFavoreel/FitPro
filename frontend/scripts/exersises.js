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
	const exerciseContainer = document.querySelector("#begin");
	const exerciseCountElement = document.querySelector("#exerciseCount");

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

		// Update exercise count
		const exerciseCount = responseData.length;
		exerciseCountElement.textContent = exerciseCount;

		// showing exercises
		responseData.forEach(function (exercise) {
			const exerciseInstance = new Exercise(exercise.name, exercise.type, exercise.muscle, exercise.difficulty, exercise.equipment, exercise.instructions);
			// Assuming you want to append each exercise to a container with class "textRectangle"
			const insertHTML = `
			<div class="organise">
			<div>
				<h1>${exercise.name}</h1>
				<h2>${exercise.instructions}</h2>
			</div>
			<div class="img">
				<img src="/frontend/svg/cardio.jpeg" alt="" />
			</div>
		</div>
      `;
			// Assuming you want to append each container to the body
			exerciseContainer.insertAdjacentHTML("beforeend", insertHTML);
			console.log(exerciseInstance);
			// document inpoppen
		});

		showPopupButton.addEventListener("click", () => {
			alert("Goed gedaan, je bent klaar!");
			window.scrollTo(0, 0); // Scroll to the top of the page
		});

		console.log(responseData);
		// Handle the response data as needed, for example, render it on the page.
	} catch (error) {
		console.error("Error submitting form:", error);
	}
});
