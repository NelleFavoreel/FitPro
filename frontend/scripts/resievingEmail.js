document.querySelector("#review").addEventListener("submit", reviews);

function reviews(event) {
	event.preventDefault();
	console.log("function called");

	let email = document.querySelector("#email").value;

	fetch("http://localhost:3000/getEmail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	});
}
