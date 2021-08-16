import React, { useState, useEffect } from 'react';
import {Button, Card, CardColumns, Container, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SAVE_MOVIE } from '../../utils/mutations';
import { MOVIE_API_QUERY }from '../../utils/queries';
import Auth from '../../utils/auth';
import { saveMediaIds, getSavedIds } from '../../utils/saveMedia';
let genre = document.getElementById('movie-horror').value;

const SearchMedia = () => {
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState(getSavedIds());
    
    const { loading, data } = useQuery(MOVIE_API_QUERY, {
        variables: { genre: genre }
    });
    const [saveMovie] = useMutation(SAVE_MOVIE);

    useEffect(() => {
        return () => saveMediaIds(savedMedia);
    });

    if (loading) {
        return <div>Loading...</div>
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        
        let imgLink = "https://image.tmdb.org/t/p/w500";
        
        try {
            let movieData = data.movie.map((movies) => ({
               movieId: movies.id,
               movieName: movies.original_title,
               moviePoster: imgLink + movies.poster_path,
               movieDetails: movies.overview,
               movieRating: movies.vote_average
            }));

            setSearchedMedia(movieData);
            console.log(movieData)
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMedia = async (mediaId) => {
        const mediaToSave = searchedMedia.find((media) => media.id === media);
        
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
    };

    return (
        <main class="return-data">
            <button id="movie-horror" name="Movie" value="27" onClick={handleButtonClick}>Horror</button>
            <button id="movie" name="Movie" value="27" onClick={handleButtonClick}>Horror</button>
            <Container>
                <CardColumns>
                    {searchedMedia.map((movies) => {
                        return (
                            <Card key={movies.movieId} style={{ width: '18rem' }}>
                                <Card.Img src={movies.moviePoster} alt={`The poster for ${movies.movieName}`} variant="top" />
                                <Card.Body className="card-body">
                                    <Card.Title>{movies.movieName}</Card.Title>
                                    <Card.Text>{movies.movieDetails}</Card.Text>
                                    <Card.Text>Rating: {movies.movieRating}</Card.Text>
                                    <Button variant="primary">Save to your favorites!</Button>
                                    <Button variant="primary">Watch a trailer!</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
        </main>
    );
};

export default SearchMedia;
