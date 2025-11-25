import { getMovies, showCards } from "./Helpers.js";

// Variables

const movieCards = document.querySelector(".movie-cards");
const select = document.querySelector(".selection select");
const title = document.querySelector(".title");
const searchBtn = document.querySelector(".search-button");
const bigButton = document.querySelector(".big-button");

const observer = new IntersectionObserver((entries, observer) => {
    const button = entries[0];
    console.log(button);

    if (button.intersectionRect.top <= 0) {
        bigButton.style.display = bigButton.style.display === "block" ? "none" : "block";
    }
});

observer.observe(searchBtn);

//Event Listeners

window.addEventListener("DOMContentLoaded", async () => {
    const movies = await getMovies(select.value);
    movieCards.innerHTML = showCards(movies);
});

title.addEventListener("click", () => {
    const selection = document.querySelector(".selection");
    selection.style.display = selection.style.display === "block" ? "none" : "block";
});

searchBtn.addEventListener("click", () => {

});