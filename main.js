import { getMovies, showCards } from "./Helpers.js";

// Variables

const movieCards = document.querySelector(".movie-cards");
const select = document.querySelector(".selection select");
const title = document.querySelector(".title");
const searchBtn = document.querySelector(".search-button");
const bigButton = document.querySelector(".big-button");

const observer = new IntersectionObserver((entries, observer) => {
    const button = entries[0];

    if (button.intersectionRect.top <= 0 && !searchBtn.disabled) {
        bigButton.style.display = bigButton.style.display === "block" ? "none" : "block";
    }
});

observer.observe(searchBtn);

//Event Listeners

window.addEventListener("DOMContentLoaded", async () => {
    const movies = await getMovies(select.value);
    movieCards.innerHTML = showCards(movies);
});

select.addEventListener("change", () => {
    searchBtn.disabled = false;
    searchBtn.classList.add("button-active");
});

title.addEventListener("click", () => {
    const selection = document.querySelector(".selection");
    selection.style.display = selection.style.display === "block" ? "none" : "block";
});

searchBtn.addEventListener("click", async () => {
    movieCards.innerHTML = "";
    const movies = await getMovies(select.value);
    console.log(movies);
    movieCards.innerHTML = showCards(movies);
    searchBtn.disabled = true;
    searchBtn.classList.remove("button-active");
});

bigButton.addEventListener("click", async () => {
    movieCards.innerHTML = "";
    const movies = await getMovies(select.value);
    movieCards.innerHTML = showCards(movies);
    console.log(movies);
    searchBtn.disabled = true;
});