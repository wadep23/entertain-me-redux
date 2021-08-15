import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SAVE_GAME, SAVE_MOVIE, SAVE_TV_SHOW } from '../../utils/mutations';
import { 
MOVIE_API_QUERY, 
TV_API_QUERY, 
GAME_API_QUERY, 
TRAILER_API_QUERY }from '../../utils/queries';
import Auth from '../../utils/auth';
import { saveMediaIds, getSavedIds } from '../../utils/saveMedia';

const searchMedia = () => {
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState(getSavedIds());
    
    const [saveGame] = useMutation(SAVE_GAME);
    const [saveMovie] = useMutation(SAVE_MOVIE);
    const [saveTvShow] = useMutation(SAVE_TV_SHOW);

    const [movieQuery] = useQuery(MOVIE_API_QUERY);
    const [tvQuery] = useQuery(TV_API_QUERY);
    const [gameQuery] = useQuery(GAME_API_QUERY);
    const [trailerQuery] = useQuery(TRAILER_API_QUERY);
    
    useEffect(() => {
        return () => saveMediaIds(savedMedia)
    });

    const handleFormSubmit = async (event, mediaType, genre, platform) => {
        event.preventDefault();
        let imgLink = "https://image.tmdb.org/t/p/w500";

        if (mediaType === 'Movie') {
            try {
                const response = await movieQuery(genre);

                if (!response.ok) {
                    throw new Error('Something went wrong, we apologize!');
                }

                const { movie } = await response.json();

                const movieData = movie.map((movie) => ({
                   movieId: movie.id,
                   movieName: movie.original_title,
                   moviePoster: `${imgLink} + ${movie.poster_path}`,
                   movieDetails: movie.overview,
                   movieRating: movie.vote_average
                }));

                setSavedMedia(movieData);
            } catch (err) {
                console.error(err);
            }
        } else if (mediaType === 'TV Show') {
            try {
                const response = await tvQuery(genre);

                if (!response.ok) {
                    throw new Error('Something went wrong, we apologize');
                }

                const { tvShow } = await response.json();

                const showData = tvShow.map((tvShow) => ({
                   tvShowId: tvShow.id,
                   tvShowName: tvShow.original_title,
                   tvShowPoster: `${imgLink} + ${tvShow.poster_path}`,
                   tvShowDetails: tvShow.overview,
                   tvShowRating: tvShow.vote_average
                }));

                setSavedMedia(showData);
            } catch (err) {
                console.error(err);
            }
        } else if (mediaType === 'Game') {
            try {
                const response = await gameQuery(genre, platform);

                if (!response.ok) {
                    throw new Error('Something went wrong, we apologize');
                }

                const { game } = await response.json();

                const gameData = game.map((game) => ({
                    gameId: game.id,
                    gameName: game.name,
                    gamePoster: game.background_image,
                    gameRating: game.rating,
                }));
                
                setSavedMedia(gameData);
            } catch (err) {
                console.error(err);
            }
        };
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

    return ();
};

export default searchMedia
