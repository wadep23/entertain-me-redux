require('dotenv').config();


export const movieQuery = (genre) => {
    return fetch("https://api.themoviedb.org/3/discover/movie?api_key="
     + process.env.MOVIE_TV_API_KEY + "&language=en-US&with_genres=" + genre)
};

export const tvQuery = (genre) => {
    return fetch("https://api.themoviedb.org/3/discover/tv?api_key="
    + process.env.MOVIE_TV_API_KEY + "&language=en-US&with_genres=" + genre)
};

export const gameQuery = (genre, platform) => {
    return fetch("https://api.rawg.io/api/games?key=" + process.env.GAME_API_KEY
    + "&genres=" + genre + "&parent_platforms=" + platform);
};