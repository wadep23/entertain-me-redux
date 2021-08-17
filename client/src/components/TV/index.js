import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Container, Col } from 'react-bootstrap';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { SAVE_TV_SHOW, ADD_POST } from '../../utils/mutations';
import { TV_API_QUERY, QUERY_SELF }from '../../utils/queries';
import TrailerModal from '../TrailerModal';
import Auth from '../../utils/auth';

const SearchMedia = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [trailerModalTitle, setTrailerModalTitle] = useState('');
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState({});

    const [getGenre, { loading, data }] = useLazyQuery(TV_API_QUERY);
    
    const [saveTvShow] = useMutation(SAVE_TV_SHOW);
    const [createPost] = useMutation(ADD_POST);
    
    useEffect(() => {
        if (data) {
            let tvShowData = data.tvShow.map((tvShow) => ({
                tvShowId: tvShow.id,
                tvShowName: tvShow.name,
                tvShowPoster: imgLink + tvShow.poster_path,
                tvShowDetails: tvShow.overview,
                tvShowRating: tvShow.vote_average
            }));
            setSearchedMedia(tvShowData) 
        }
    }, [data, imgLink]);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSaveMedia = async (tvShowId) => {
        const showToSave = searchedMedia.find((media) => media.tvShowId === tvShowId);
        
        try {
            await saveTvShow({
                variables: {
                    tvShowId: showToSave.tvShowId,
                    tvShowName: showToSave.tvShowName,
                    tvShowPoster: showToSave.tvShowPoster,
                    tvShowDetails: showToSave.tvShowDetails,
                    tvShowRating: showToSave.tvShowRating
                }
            })

            await createPost({
                variables: {
                  postText: ` saved ${showToSave.tvShowName} to their favorite shows!`  
                }
            })

            setSavedMedia([...savedMedia, showToSave.tvShowId])
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div class="return-data">
            <Container>
                <Row fluid>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 16 }})}}
                        >Animation</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 80 }})}}
                        >Crime</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 99 }})}}
                         >Documentary</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10751 }})}}
                         >Family</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10763 }})}}
                         >News</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10764 }})}}
                         >Reality</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 18 }})}}
                         >Drama</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10765 }})}}
                         >Sci-Fi & Fantasy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10766 }})}}
                         >Soap</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 35 }})}}
                         >Comedy</button>
                    </Col>
                </Row>
                <Row>
                    {searchedMedia.map((shows) => {
                        return (
                            <Col sm={3}>
                                <Card key={shows.tvShowId} style={{ width: '18rem' }}>
                                    <Card.Img src={shows.tvShowPoster} alt={`The poster for ${shows.tvShowName}`} variant="top" />
                                    <Card.Body className="card-body">
                                        <Card.Title>{shows.tvShowName}</Card.Title>
                                        <Card.Text>{shows.tvShowDetails}</Card.Text>
                                        <Card.Text>Rating: {shows.tvShowRating}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button variant="primary" onClick={() => {handleSaveMedia(shows.tvShowId); }}>Save to your favorites!</Button>
                                        )}
                                        <Button variant="primary" onClick={() => {setShowTrailerModal(true)
                                         setTrailerModalTitle(shows.tvShowName + " Show Trailer"); }}
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