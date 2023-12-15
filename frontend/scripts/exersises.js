import Exercise from "./Exercise.js";

const app = {
	filteredExercises: [],
	exercises: [],
};

function getData() {
	fetch("http://localhost:3000/showExersises", {
		method: "GET",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	})
		.then((data) => data.json())
		.then(function (response) {
			console.log(response);
			response.items.forEach(function (exercises) {
				const exercise = new Exercise(exercises.name, exercises.type, exercises.muscle, exercises.equipment, exercises.instructions);
				app.exercises.push(exercise);
				// document inpoppen
			});
		})
		.catch(function (error) {
			console.error("Error fetching data:", error);
		});
}

async function mapDifficultyOnServer(filter) {
	try {
		const response = await fetch(`http://localhost:3000/mapDifficulty?dificulty=${filter}`);
		const data = await response.json();

		return data.mappedDifficulty;
	} catch (error) {
		console.error("Error fetching difficulty mapping:", error);
		throw error; // Re-throw the error for further handling
	}
}

// Example usage
const mappedDifficulty = await mapDifficultyOnServer("Beginner");
console.log(mappedDifficulty);

getData();
