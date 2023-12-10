//chatGPT not good info
document.getElementById("startButton").addEventListener("click", function (event) {
	// Prevent the default link behavior
	event.preventDefault();

	// Add a class to the content container to trigger the smooth slide-out animation
	document.querySelector(".content").classList.add("slide-out");

	// After a short delay, navigate to the new page
	setTimeout(function () {
		window.location.href = event.target.getAttribute("href");
	}, 500); // Adjust the delay (in milliseconds) to match the transition duration
});
