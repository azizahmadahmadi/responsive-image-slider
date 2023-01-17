const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
	// Showing and hiding prev/next icon according to carosuel scroll left value.
	let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width
	arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
	arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
	icon.addEventListener("click", () => {
		let firstImgWidth = firstImg.clientWidth + 14; //Getting first img width and adding 14 margin value
		// if clicked icon is left, reduce width value from the carousel scroll left else add to it.
		carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
		setTimeout(() => showHideIcons(), 60); // Calling showHideIcons after 60ms.
	});
});

const autoSlide = () => {
	// If there is no image left to scroll then return from here.
	if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

	positionDiff = Math.abs(positionDiff); // Making positionDiff value to positive.
	let firstImgWidth = firstImg.clientWidth + 14;
	// Getting difference value that needs to add or reduce from carousel left to take middle img center.
	let valDifference = firstImgWidth - positionDiff;

	if (carousel.scrollLeft > prevScrollLeft) { // If user is crolling to the right
		return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
	}
	// If user is scrolling to the left
	carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) =>{
	// Updating global variables value on muse down event.
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
	// Scrolling images/carousel to left according to mouse pointer
	if(!isDragStart) return;
	e.preventDefault();
	isDragging = true;
	carousel.classList.add("dragging");
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
	carousel.scrollLeft = prevScrollLeft - positionDiff;
	showHideIcons();
}

const dragStop = () => {
	isDragStart = false;
	carousel.classList.remove("dragging");

	if (!isDragging) return;
	isDragging = false;
	autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
