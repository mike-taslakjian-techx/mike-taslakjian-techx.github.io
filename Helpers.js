// Function accepts the sort_by parameter and returns a sorted array of movies

async function getMovies (sortBy) {
    const url = `https://api.themoviedb.org/3/movie/popular?page=1&sort_by=${sortBy}`;
    console.log(url);
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

// Function accepts an array of movies and returns an HTML string

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

    return moviesHTML.join("");
};

export { getMovies, showCards };