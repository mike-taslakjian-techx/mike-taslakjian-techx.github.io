import { getMovies, showCards } from "./Helpers.js";

const movieCards = document.querySelector(".movie-cards");
const select = document.querySelector(".selection select");

console.log(select);

window.addEventListener("DOMContentLoaded", async () => {
    const movies = await getMovies(select.value);
    movieCards.innerHTML = showCards(movies);
});