// Function accepts the sort_by parameter and returns a sorted array of movies

async function getMovies (sortBy, pages, genres) {
    let url = "";
    if (genres.length === 0) {
        url = `https://api.themoviedb.org/3/discover/movie?page=${pages}&sort_by=${sortBy}`;
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?page=${pages}&sort_by=${sortBy}&with_genres=${genres.join(",")}`;
    }
    
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
    const moviesHTML = movies.map(({ poster_path, title, release_date, vote_average }) => {
        const src = poster_path ? `https://media.themoviedb.org/t/p/w220_and_h330_face${poster_path}` : "assets/cards/no-image.svg";
        //const gradient = NavigationHistoryEntry;
        return (
            `<div class="movie-card">
                <button><span>...</span></button>
                <a href="">
                    <img src="${src}" alt="${title} poster" />
                    <div class="rating-container">
                        <div class="rating" style="background: ${getGradient(vote_average)};">
                            <div>${getRating(vote_average)}</div>
                        </div>
                    </div>
                <a/>
                <div class="movie-info">
                    <p class="movie-title">${title}</p>
                    <p class="release-date">${release_date}</p>
                </div>
            </div>`
        )
    });

    return moviesHTML.join("");
};

// Function to fetch all the genres with their respective IDs

async function getGenres () {
    try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
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
        return data.genres;
    } catch (error) {
        console.log(error);
    }
};

// Function to activate any button

function activateBtn (button) {
    button.style.backgroundColor = "var(--blue)";
    button.style.color = "var(--white)";
    button.disabled = false;
    button.style.cursor = "pointer";
};

// Function to calculate movie rating

function getRating (rating) {
    return Math.ceil(rating * 10);
}

// Function to return gradient string for ratings

function getGradient (rating) {
    const angle = (getRating(rating) / 100) * 360;
    const hue = (getRating(rating) / 100) * 120;
    const fillColor = `hsl(${hue}, 70%, 40%)`;
    const emptyColor = `#E0E0E0`;
    const gradientCSS = `conic-gradient(
      ${fillColor} 0deg ${angle}deg,
      ${emptyColor} ${angle}deg 360deg
    )`;
    console.log(gradientCSS);
    return gradientCSS;
}

export { getMovies, showCards, getGenres, activateBtn };