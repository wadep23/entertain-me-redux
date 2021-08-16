import React, { useQuery } from 'react';
import { 
    MOVIE_API_QUERY, 
    TV_API_QUERY, 
    GAME_API_QUERY, 
    TRAILER_API_QUERY }from '../../utils/queries';

export const MovieQuery = async (genre) => {
    const { loading, data } = useQuery(MOVIE_API_QUERY, {
        variables: { genre: genre }
    });
    
    const response = await data

    if (!response.ok) {
        throw new Error('Something went wrong, we apologize!');
    }

    const { movies } = await response.json();

    return movies
};

// export const tvQuery = (genre) => {
//   return fetch(
//     "https://api.themoviedb.org/3/discover/tv?api_key=" +
//       api_key +
//       "&language=en-US&with_genres=" +
//       genre
//   );
// };

// export const gameQuery = (genre, platform) => {
//   return fetch(
//     "https://api.rawg.io/api/games?key=" +
//       api_key +
//       "&genres=" +
//       genre +
//       "&parent_platforms=" +
//       platform
//   );
// };

// export const testVideo = (title) => {
//   return fetch(
//     "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
//       title +
//       "&key=" +
//       api_key
//   );
// };
