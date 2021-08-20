import React, { useState, useEffect } from 'react';
import {Button, Card, Row, Container, Col} from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SAVE_MOVIE, ADD_POST } from '../../utils/mutations';
import { MOVIE_API_QUERY }from '../../utils/queries';
import MovieModal from '../MovieModal';
import Auth from '../../utils/auth';
import { FaLaughSquint, FaHeart, FaSadCry, FaHatCowboy, FaMusic } from "react-icons/fa";
import { GiPistolGun, GiEarthAmerica, GiGhost, GiUnicorn, GiMagnifyingGlass, GiTvRemote, GiSpartanHelmet, GiHandcuffs, GiFamilyHouse, GiAncientColumns  } from "react-icons/gi";
import { RiAliensFill, RiKnifeBloodLine } from "react-icons/ri";
import { BiCameraMovie } from "react-icons/bi";

const SearchMovies = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [showMovieTrailerModal, setShowMovieTrailerModal] = useState(false);
    const [movieTrailerModalTitle, setMovieTrailerModalTitle] = useState('');
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState({});

    const [getGenre, { loading, data }] = useLazyQuery(MOVIE_API_QUERY);
    
    const [saveMovie] = useMutation(SAVE_MOVIE);
    const [createPost] = useMutation(ADD_POST);
    
    useEffect(() => {
        if (data) {
            let movieData = data.movie.map((movies) => ({
                movieId: movies.id,
                movieName: movies.original_title,
                moviePoster: imgLink + movies.poster_path,
                movieDetails: movies.overview,
                movieRating: movies.vote_average
            }));
            setSearchedMedia(movieData) 
        }
    }, [data, imgLink]);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSaveMedia = async (movieId) => {
        const movieToSave = searchedMedia.find((media) => media.movieId === movieId);
        
        try {
            await saveMovie({
                variables: {
                    movieId: movieToSave.movieId,
                    movieName: movieToSave.movieName,
                    moviePoster: movieToSave.moviePoster,
                    movieDetails: movieToSave.movieDetails,
                    movieRating: movieToSave.movieRating
                }
            })

            await createPost({
                variables: {
                  postText: ` saved ${movieToSave.movieName} to their favorite movies!`  
                }
            })

            setSavedMedia([...savedMedia, movieToSave.movieId])
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div className="return-data">
            <Container>
                <Row fluid="true">
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 28 }})}} 
                        ><GiPistolGun /> Action</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 12 }})}}
                        ><GiEarthAmerica /> Adventure</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 35 }})}}
                         ><FaLaughSquint /> Comedy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 80 }})}}
                         ><GiHandcuffs  /> Crime</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 99 }})}}
                         ><BiCameraMovie  /> Documentary</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 18 }})}}
                        ><FaSadCry /> Drama</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10751 }})}}
                        ><GiFamilyHouse /> Family</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 14 }})}}
                        ><GiUnicorn /> Fantasy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 36 }})}}
                        ><GiAncientColumns /> History</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 27 }})}}
                        ><GiGhost /> Horror</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10402 }})}}
                        ><FaMusic /> Music</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 9648 }})}}
                        ><GiMagnifyingGlass /> Mystery</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10749 }})}}
                        ><FaHeart /> Romance</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 878 }})}}
                        ><RiAliensFill /> Sci-Fi</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10770 }})}}
                        ><GiTvRemote /> TV Movie</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 53 }})}}
                        ><RiKnifeBloodLine /> Thriller</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10752 }})}}
                        ><GiSpartanHelmet /> War</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 37 }})}}
                        ><FaHatCowboy /> Western</button>
                    </Col>
                </Row>
                <Row>
                    {searchedMedia.map((movies) => {
                        return (
                            <Col sm={3}>
                                <Card key={movies.movieId} style={{ width: '18rem' }}>
                                    <Card.Img src={movies.moviePoster} alt={`The poster for ${movies.movieName}`} variant="top" />
                                    <Card.Body className="card-body">
                                        <Card.Title>{movies.movieName}</Card.Title>
                                        <Card.Text>{movies.movieDetails}</Card.Text>
                                        <Card.Text>Rating: {movies.movieRating}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button variant="primary" onClick={() => {handleSaveMedia(movies.movieId); }}>Save to your favorites!</Button>
                                        )}
                                        <Button variant="primary" onClick={() => {setShowMovieTrailerModal(true)
                                         setMovieTrailerModalTitle(movies.movieName + " Movie Trailer"); }}
                                        >Watch a trailer!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>   
                        )   
                    })}  
                </Row>
            </Container>
            <MovieModal
                showMovieTrailerModal={showMovieTrailerModal}
                setShowMovieTrailerModal={setShowMovieTrailerModal}
                movieTrailerModalTitle={movieTrailerModalTitle}
                setMovieTrailerModalTitle={setMovieTrailerModalTitle}
            ></MovieModal>    
        </div>
    );
};

export default SearchMovies;