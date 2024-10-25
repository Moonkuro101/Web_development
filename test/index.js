let currentIndex = 0; // Track the current index of the slides
const slides = document.getElementById("slides");
const totalSlides = slides.children.length; // Get total number of slides

function moveSlides(direction) {
    currentIndex += direction;

    // Loop the slides if necessary
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Calculate the new offset and apply it to the slides
    const offset = -currentIndex * 215; // 215 is the approximate width of card + margin
    slides.style.transform = `translateX(${offset}px)`;
}
