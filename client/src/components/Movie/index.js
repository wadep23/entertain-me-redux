import React, { useState, useEffect } from 'react';
import {Button, Card, Row, Container, Col} from 'react-bootstrap';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { SAVE_MOVIE, ADD_POST } from '../../utils/mutations';
import { MOVIE_API_QUERY, QUERY_SELF }from '../../utils/queries';
import TrailerModal from '../TrailerModal';
import Auth from '../../utils/auth';
import { FaLaughSquint, FaHeart, FaSadCry, FaRegPlayCircle } from "react-icons/fa";
import { GiPistolGun, GiEarthAmerica, GiGhost, GiUnicorn, GiMagnifyingGlass } from "react-icons/gi";
import { RiAliensFill } from "react-icons/ri";


const SearchMedia = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [trailerModalTitle, setTrailerModalTitle] = useState('');
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
        <div class="return-data">
            <Container fluid>
                <Row>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 27 }})}}
                        ><GiGhost /> Horror</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 28 }})}} 
                        ><GiPistolGun /> Action</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 12 }})}}
                        ><GiEarthAmerica /> Adventure</button>
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
                        <button onClick={() => { getGenre({ variables: { genre: 18 }})}}
                        ><FaSadCry /> Drama</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 14 }})}}
                        ><GiUnicorn /> Fantasy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 9648 }})}}
                        ><GiMagnifyingGlass /> Mystery</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 35 }})}}
                         ><FaLaughSquint /> Comedy</button>
                    </Col>
                </Row>
                <Row>
                    {searchedMedia.map((movies) => {
                        return (
                            <Col sm={3}>
                                <Card key={movies.movieId} style={{ width: '18rem' }}>
                                    <Card.Img src={movies.moviePoster} alt={`The poster for ${movies.movieName}`} variant="top" style={{ height: '20rem' }}/>
                                    <Card.Body className="card-body">
                                        <Card.Title>{movies.movieName}</Card.Title>
                                        <Card.Text>{movies.movieDetails}</Card.Text>
                                        <Card.Text>Rating: {movies.movieRating}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button variant="primary" onClick={() => {handleSaveMedia(movies.movieId); }}>Save to your favorites!</Button>
                                        )}
                                        <Button variant="primary" onClick={() => {setShowTrailerModal(true)
                                         setTrailerModalTitle(movies.movieName + " Movie Trailer"); }}
                                        >Watch a trailer!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>   
                        )   
                    })}  
                </Row>
            </Container>
            <TrailerModal
                showTrailerModal={showTrailerModal}
                setShowTrailerModal={setShowTrailerModal}
                trailerModalTitle={trailerModalTitle}
                setTrailerModalTitle={setTrailerModalTitle}
            ></TrailerModal>    
        </div>
    );
};

export default SearchMedia;