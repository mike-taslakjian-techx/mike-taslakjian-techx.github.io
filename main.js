const movieCards = document.querySelector(".movie-cards");

async function getMovies () {
    const url = "https://api.themoviedb.org/3/movie/popular";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2NmZWM3NmFkZDYzNWI4NjQ1MDdmMDQxMmY4YTg2OSIsIm5iZiI6MTc2Mzk3NzIwMi40NDgsInN1YiI6IjY5MjQyN2YyZDMyZjYzYWFiYWEzYjhjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqZteU0a8xJQ7ePBy4DlcVHwv3qAzKyoG1uqKdKokME"
            }
        });

        if (!response.ok) {
            console.log("Oops! Something went wrong...");
        }

        const data = await response.json();
        const movies = data.results;
        return movies;
    } catch (error) {
        console.log(error);
    }
};

function showCards (movies) {
    const moviesHTML = movies.map(({ poster_path, title, release_date }) => {
        return (
            `<div class="movie-card">
                <button><span>...</span></button>
                <div></div>
                <a href=""><img src=https://media.themoviedb.org/t/p/w220_and_h330_face/${poster_path} alt="${title} poster" /><a/>
                <div class="movie-info">
                    <p class="movie-title">${title}</p>
                    <p class="release-date">${release_date}</p>
                </div>
            </div>`
        )
    });

    movieCards.innerHTML = moviesHTML.join("");
}

window.addEventListener("DOMContentLoaded", async () => {
    const movies = await getMovies();
    console.log(movies);
    showCards(movies);
})