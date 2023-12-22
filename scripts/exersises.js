// Fetch data on page load
import Exercise from "Exercise.js";

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
			const exerciseInstance = new Exercise(exercise.name, exercise.type, exercise.muscle, exercise.difficulty, exercise.equipment, exercise.instructions, exercise.image);
			// Assuming you want to append each exercise to a container with class "textRectangle"
			const insertHTML = `
			<div class="organise">
			<div>
				<h1>${exercise.name}</h1>
				<h2>${exercise.instructions}</h2>
			</div>
			<div class="img">
				<img src="${exercise.image}" alt="" />
			</div>
		</div>
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
// Get the current day from the radio buttons
const getCurrentDay = () => {
	const checkedRadioButton = document.querySelector('input[name="sortBy"]:checked');
	return checkedRadioButton ? checkedRadioButton.value : null;
};

// Function to get the next day
const getNextDay = (currentDay) => {
	const days = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
	const currentIndex = days.indexOf(currentDay);
	const nextIndex = (currentIndex + 1) % days.length;
	return days[nextIndex];
};

// Add event listener to the "Einde" button for scrolling to the next day
const showPopupButton = document.getElementById("showPopupButton");

showPopupButton.addEventListener("click", () => {
	alert("Goed gedaan, je bent klaar!");

	const currentDay = getCurrentDay();
	console.log("Current day:", currentDay);

	if (currentDay) {
		const nextDay = getNextDay(currentDay);
		console.log("Next day:", nextDay);

		const nextDaySection = document.getElementById(nextDay);
		console.log("Next day section:", nextDaySection);

		if (nextDaySection) {
			nextDaySection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			window.scrollTo(0, 0);
		} else {
			console.error("Next day section not found");
		}
	}
});
