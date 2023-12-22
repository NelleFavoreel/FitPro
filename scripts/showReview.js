import Review from "Review.js";

const slidesContainer = document.querySelector(".slideshow-container");

fetch("http://localhost:3000/showreview", {
	method: "GET",
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
})
	.then((response) => response.json())
	.then(async (data) => {
		// Added async to the function to use 'await'
		console.log(data);
		data.forEach(async (reviewData, index) => {
			// Added async to the forEach callback
			const review = new Review(reviewData.name, reviewData.age, reviewData.email, reviewData.description, reviewData._id);

			console.log(review);

			const reviewHTML = `
            <div class="mySlides fade">
                <div class="numbertext">${index + 1} / ${data.length}</div>
				
                <div class="text">
                    <div>
                        <h1>${review.name}</h1>
                        <h2>${review.age}</h2>
                        <p>${review.description}</p>
						<button class="closeButton-${index}">Delete review</button>
                    </div>
                </div>
				
			</div>`;

			slidesContainer.insertAdjacentHTML("beforeend", reviewHTML);

			// Move event listener code inside the forEach loop
			const deleteButton = document.querySelector(`.closeButton-${index}`);

			deleteButton.addEventListener("click", async function (event) {
				try {
					console.log(reviewData._id);

					const response = await fetch(`http://localhost:3000/showreview/${reviewData._id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
					});

					if (response.ok) {
						console.log("Review deleted successfully");
						location.reload();
					} else {
						console.log(`Failed to delete review. Server returned status: ${response.status}`);
						const errorMessage = await response.text();
						console.error(`Error message from server: ${errorMessage}`);
					}
				} catch (error) {
					console.log(error);
				}
			});
		});
		showSlides(1);
	})
	.catch((error) => {
		console.error(error);
	});
