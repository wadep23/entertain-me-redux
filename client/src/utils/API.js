const api_key = "AIzaSyA_6gm34VRotQOOvhwlKxbncYUGrAXAADw";
let randomNumber = Math.floor(Math.random() * 500);

export const movieQuery = (key, genre) => {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      key +
      "&language=en-US&page=1&with_genres=" +
      genre
  );
};

export const tvQuery = (genre) => {
  return fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=" +
      api_key +
      "&language=en-US&with_genres=" +
      genre
  );
};

export const gameQuery = (genre, platform) => {
  return fetch(
    "https://api.rawg.io/api/games?key=" +
      api_key +
      "&genres=" +
      genre +
      "&parent_platforms=" +
      platform
  );
};

export const testVideo = (title) => {
  return fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
      title +
      "&key=" +
      api_key
  );
};
