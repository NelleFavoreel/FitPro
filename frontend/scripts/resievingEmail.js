document.querySelector("#emailContent").addEventListener("submit", getEmail);

function getEmail(event) {
	event.preventDefault();
	console.log("function called");

	let email = document.querySelector("#emailField").value;

	fetch("http://localhost:3000/getEmail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({ userEmail: email }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not okay");
			}
			location.reload();
			return response.json();
		})
		.then((data) => {
			console.log(data); // Log the response from the server
		})

		.catch((error) => {
			console.error(error);
		});
}
