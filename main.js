import { getMovies, showCards, getGenres, activateBtn } from "./Helpers.js";

// Variables

const movieCards = document.querySelector(".movie-cards");
const select = document.querySelector(".selection select");
const titles = document.querySelectorAll(".title");
const searchBtn = document.querySelector(".search-button");
const bigButton = document.querySelector(".big-button");
const loadMoreBtn = document.querySelector(".load-more");
const genres = document.querySelector(".genres");
let page = 1;
let genreIDs = [];

const observer = new IntersectionObserver((entries, _observer) => {
    const button = entries[0];

    if (button.intersectionRect.top <= 0 && !searchBtn.disabled) {
        bigButton.style.display = bigButton.style.display === "block" ? "none" : "block";
    }
});

observer.observe(searchBtn);

//Event Listeners

window.addEventListener("DOMContentLoaded", async () => {
    const movies = await getMovies(select.value, page, genreIDs);
    const genresArr = await getGenres();
    movieCards.innerHTML = showCards(movies);
    
    genresArr.forEach(({ id, name }) => genres.innerHTML += `<button id="${id}">${name}</button>`)
    
});

select.addEventListener("change", () => {
    activateBtn(searchBtn);
});

titles.forEach((title) => {
    title.addEventListener("click", (e) => {
        const span = e.target.querySelector("span");
        span.style.transform = span.style.transform === "rotate(90deg)" ? "rotate(0)" : "rotate(90deg)";
        let selection = null;

        if (e.target.id === "sort-menu") {
            selection = document.querySelector(".sort .selection");
        }

        if (e.target.id === "filter-menu") {
            selection = document.querySelector(".filter .selection");
        }

        selection.style.display = selection.style.display === "block" ? "none" : "block";
    })
})

searchBtn.addEventListener("click", async () => {
    page = 1;
    movieCards.innerHTML = "";
    const movies = await getMovies(select.value, page, genreIDs);
    movieCards.innerHTML = showCards(movies);
    searchBtn.disabled = true;
    searchBtn.style.cursor = "auto";
    searchBtn.classList.remove("button-active");
    bigButton.style.display = "none";
    genreIDs = [];
});

bigButton.addEventListener("click", async () => {
    page = 1;
    movieCards.innerHTML = "";
    const movies = await getMovies(select.value, page, genreIDs);
    movieCards.innerHTML = showCards(movies);
    searchBtn.disabled = true;
    searchBtn.style.cursor = "auto";
    bigButton.style.display = "none";
    genreIDs = [];
});

loadMoreBtn.addEventListener("click", async () => {
    page++;
    const movies = await getMovies(select.value, page, genreIDs);
    movieCards.innerHTML += showCards(movies);
});

genres.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    genreIDs.push(button.id);
    activateBtn(searchBtn);
    activateBtn(button);
});
