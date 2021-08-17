import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Card, Row, Container, Col} from 'react-bootstrap';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { SAVE_MOVIE, ADD_POST } from '../../utils/mutations';
import { MOVIE_API_QUERY, QUERY_SELF }from '../../utils/queries';
import TrailerModal from '../TrailerModal';
import Auth from '../../utils/auth';
import { FaLaughSquint, FaHeart, FaSadCry, FaRegPlayCircle } from "react-icons/fa";
import { GiFilmProjector, GiPistolGun, GiEarthAmerica, GiGhost, GiUnicorn, GiMagnifyingGlass, GiTheaterCurtains } from "react-icons/gi";
import { RiAliensFill } from "react-icons/ri";

    //     <section id="movieButtons">
    //             <container>
    //             <button type="button" value="theaters"><GiTheaterCurtains /> Amphitheatre</button>
    //             <button type="button" value="streaming"><FaRegPlayCircle /> Streaming</button>
    //             </container>
    //             <br />
    //             <br />
    //             <container>
    //             <button type="button" id="Action" value="28"><GiPistolGun /> Action</button>
    //             <button type="button" id="Adventure" value="12"><GiEarthAmerica /> Adventure</button>
    //             <button type="button" id="Comedy" value="35"><FaLaughSquint /> Comedy</button>
    //             <button type="button" id="Romance" value="10749"><FaHeart /> Romance</button>
    //             <button type="button" id="Sci-Fi" value="878"><RiAliensFill /> Sci-Fi</button>
    //             <button type="button" id="Horror" value="27"><GiGhost /> Horror</button>
    //             <button type="button" id="Drama" value="18"><FaSadCry /> Drama</button>
    //             <button type="button" id="Fantasy" value="14"><GiUnicorn /> Fantasy</button>
    //             <button type="button" id="Mystery" value="9648"><GiMagnifyingGlass /> Mystery</button>
    //             </container>
    //         </section>

const SearchMedia = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [trailerModalTitle, setTrailerModalTitle] = useState('');
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState({});
    // const { username: userParam } = useParams();

    // const { userLoading, userData } = useQuery(QUERY_SELF, {
    //     variables: { username: userParam }
    // });

    const [getGenre, { loading, data }] = useLazyQuery(MOVIE_API_QUERY);
    
    const [saveMovie] = useMutation(SAVE_MOVIE);
    // const [createPost] = useMutation(ADD_POST);

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
    // console.log(userData)
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

            // await createPost({
            //     variables: {
            //       postText: `${userData.user}`  
            //     }
            // })

            setSavedMedia([...savedMedia, movieToSave.movieId])
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div class="return-data">
            <Container>
                <Row>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 27 }})}}
                        >Horror</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 28 }})}} 
                        >Action</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 12 }})}}
                        >Adventure</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10749 }})}}
                         >Romance</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 878 }})}}
                         >Sci-Fi</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 18 }})}}
                         >Drama</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 14 }})}}
                         >Fantasy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 9648 }})}}
                         >Mystery</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 35 }})}}
                         >Comedy</button>
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