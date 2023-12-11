"use strict";

// creat reviews
document.querySelector("#review").addEventListener("submit", reviews);

function reviews(event) {
	event.preventDefault();
	console.log("function called");

	let userName = document.querySelector("#name").value;
	let userAge = document.querySelector("#age").value;
	let userEmail = document.querySelector("#email").value;
	let userDescription = document.querySelector("#review")[3].value;

	const data = {
		name: userName,
		age: userAge,
		email: userEmail,
		description: userDescription,
	};

	console.log(data);

	fetch("http://localhost:3000/review", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not okay");
			}
			return response.json();
		})
		.then((data) => {
			const message = data.message;
			document.querySelector("#returnMessage").insertAdjacentHTML("beforeend", `<p>${message}</p>`);
			console.log(`used email: ${userEmail}`);
		})
		.catch((error) => {
			console.error(error);
		});
}
