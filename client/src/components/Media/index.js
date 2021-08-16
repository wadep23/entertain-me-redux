import React, { useState, useEffect } from 'react';
import { MovieQuery } from '../../utils/API';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SAVE_GAME, SAVE_MOVIE, SAVE_TV_SHOW } from '../../utils/mutations';
// import { 
// MOVIE_API_QUERY, 
// TV_API_QUERY, 
// GAME_API_QUERY, 
// TRAILER_API_QUERY }from '../../utils/queries';
import Auth from '../../utils/auth';
import { saveMediaIds, getSavedIds } from '../../utils/saveMedia';

const SearchMedia = () => {
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState(getSavedIds());
    
    const [saveGame] = useMutation(SAVE_GAME);
    const [saveMovie] = useMutation(SAVE_MOVIE);
    const [saveTvShow] = useMutation(SAVE_TV_SHOW);

    //  function MultiQuery() {
    //     const movie = useQuery(MOVIE_API_QUERY);
    //     const tv = useQuery(TV_API_QUERY);
    //     const game = useQuery(GAME_API_QUERY);
    //     const trailer = useQuery(TRAILER_API_QUERY);

    //     const loading = movie.loading || tv.loading || game.loading || trailer.loading

    //     if (loading) {
    //         return <p>Loading...</p>
    //     }
    // }

    const { loading, data } = useQuery(MOVIE_API_QUERY);
    const { loading, data } = useQuery(TV_API_QUERY);
    const { loading, data } = useQuery(GAME_API_QUERY);
    const { loading, data } = useQuery(TRAILER_API_QUERY);
    
    useEffect(() => {
        return () => saveMediaIds(savedMedia)
    });

    const handleFormSubmit = async (event, mediaType, genre, platform) => {
        event.preventDefault();
        let imgLink = "https://image.tmdb.org/t/p/w500";

        if (mediaType === 'Movie') {
            try {
                const movies = await MovieQuery(genre);

                const movieData = movies.map((movie) => ({
                   movieId: movie.id,
                   movieName: movie.original_title,
                   moviePoster: `${imgLink} + ${movie.poster_path}`,
                   movieDetails: movie.overview,
                   movieRating: movie.vote_average
                }));

                setSearchedMedia(movieData);
            } catch (err) {
                console.error(err);
            }
        // } else if (mediaType === 'TV Show') {
        //     try {
        //         const response = await tvQuery(genre);

        //         if (!response.ok) {
        //             throw new Error('Something went wrong, we apologize');
        //         }

        //         const { tvShow } = await response.json();

        //         const showData = tvShow.map((tvShow) => ({
        //            tvShowId: tvShow.id,
        //            tvShowName: tvShow.original_title,
        //            tvShowPoster: `${imgLink} + ${tvShow.poster_path}`,
        //            tvShowDetails: tvShow.overview,
        //            tvShowRating: tvShow.vote_average
        //         }));

        //         setSearchedMedia(showData);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // } else if (mediaType === 'Game') {
        //     try {
        //         const response = await gameQuery(genre, platform);

        //         if (!response.ok) {
        //             throw new Error('Something went wrong, we apologize');
        //         }

        //         const { game } = await response.json();

        //         const gameData = game.map((game) => ({
        //             gameId: game.id,
        //             gameName: game.name,
        //             gamePoster: game.background_image,
        //             gameRating: game.rating,
        //         }));
                
        //         setSearchedMedia(gameData);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
    };

    const handleSaveMedia = async (mediaId, mediaType) => {
        const mediaToSave = searchedMedia.find((media) => media.id === media);

        if (mediaType === 'Movie') {
            try {
                await saveMovie({
                    variables: {
                        movieId: mediaToSave.moviedId,
                        movieName: mediaToSave.movieName,
                        moviePoster: mediaToSave.moviePoster,
                        movieDetails: mediaToSave.movieDetails,
                        movieRating: mediaToSave.movieRating
                    }
                })

                setSavedMedia([...savedMedia, mediaToSave.movieId])
            } catch (err) {
                console.error(err);
            }
        } else if (mediaType === 'TV Show') {
            try {
                await saveTvShow({
                    variables: {
                        tvShowId: mediaToSave.tvShowdId,
                        tvShowName: mediaToSave.tvShowName,
                        tvShowPoster: mediaToSave.tvShowPoster,
                        tvShowDetails: mediaToSave.tvShowDetails,
                        tvShowRating: mediaToSave.tvShowRating
                    }
                })

                setSavedMedia([...savedMedia, mediaToSave.tvShowId])
            } catch (err) {
                console.error(err);
            }
        } else if (mediaType === 'Game') {
            try {
                await saveGame({
                    variables: {
                        gameId: mediaToSave.gameId,
                        gameName: mediaToSave.gameName,
                        gamePoster: mediaToSave.gamePoster,
                        gameRating: mediaToSave.gameRating
                    }
                })

                setSavedMedia([...savedMedia, mediaToSave.gameId])
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            hi
        </div>
    );
};

export default SearchMedia
