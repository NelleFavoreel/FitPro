import Review from "./review.js";

const slidesContainer = document.querySelector(".slideshow-container");

fetch("http://localhost:3000/showreview", {
	method: "GET",
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		data.forEach((reviewData, index) => {
			const review = new Review(reviewData.name, reviewData.age, reviewData.email, reviewData.description);

			console.log(review);

			const reviewHTML = `
            <div class="mySlides fade">
                <div class="numbertext">${index + 1} / ${data.length}</div>
                <div class="text">
                    <div>
                        <h1>${review.name}</h1>
                        <h2>${review.age}</h2>
                        <p>${review.description}</p>
                    </div>
                </div>
            </div>`;

			slidesContainer.insertAdjacentHTML("beforeend", reviewHTML);
		});

		showSlides(1);
	})
	.catch((error) => {
		console.error(error);
	});
