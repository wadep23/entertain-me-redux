import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Container, Col } from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SAVE_TV_SHOW, ADD_POST } from '../../utils/mutations';
import { TV_API_QUERY }from '../../utils/queries';
import TvModal from '../TvModal';
import Auth from '../../utils/auth';
import { GiHandcuffs,  GiSoap, GiSwordwoman, GiMagnifyingGlass } from "react-icons/gi";
import { FaLaughSquint, FaSadCry, FaHatCowboy } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { BsFillPeopleFill, BsPencil} from "react-icons/bs";
import { RiKakaoTalkLine } from "react-icons/ri";
import { GoLaw } from "react-icons/go";

const SearchShows = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [showTvTrailerModal, setShowTvTrailerModal] = useState(false);
    const [tvTrailerModalTitle, setTvTrailerModalTitle] = useState('');
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
        <div className="return-data">
            <Container>
                <Row fluid="true">
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10759 }})}}
                         ><GiSwordwoman />Action/Adventure</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 16 }})}}
                        ><BsPencil /> Animation</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 35 }})}}
                         ><FaLaughSquint /> Comedy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 80 }})}}
                        ><GiHandcuffs /> Crime</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 99 }})}}
                         ><BiCameraMovie /> Documentary</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 18 }})}}
                         ><FaSadCry /> Drama</button>
                    </Col>
                    {/* <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10751 }})}}
                         ><GiFamilyHouse /> Family</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10762 }})}}
                         ><FaChild /> Kids</button>
                    </Col> */}
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 9648 }})}}
                         ><GiMagnifyingGlass /> Mystery</button>
                    </Col>
                    {/* <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10763 }})}}
                         ><GiNewspaper /> News</button>
                    </Col> */}
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10764 }})}}
                         ><BsFillPeopleFill /> Reality</button>
                    </Col>
                    {/* <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10765 }})}}
                         ><GiLightSabers /> Sci-Fi & Fantasy</button>
                    </Col> */}
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10766 }})}}
                         ><GiSoap /> Soap</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10767 }})}}
                         ><RiKakaoTalkLine /> Talk</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 10768 }})}}
                         ><GoLaw /> War & Politics</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: 37 }})}}
                         ><FaHatCowboy /> Western</button>
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
                                        <Button variant="primary" onClick={() => {setShowTvTrailerModal(true)
                                         setTvTrailerModalTitle(shows.tvShowName + " Show Trailer"); }}
                                        >Watch a trailer!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>   
                        )   
                    })}  
                </Row>
            </Container>
            <TvModal
                showTvTrailerModal={showTvTrailerModal}
                setShowTvTrailerModal={setShowTvTrailerModal}
                tvTrailerModalTitle={tvTrailerModalTitle}
                setTvTrailerModalTitle={setTvTrailerModalTitle}
            ></TvModal>    
        </div>
    );
};

export default SearchShows;

// icons for later
// GiNewspaper, GiLightSabers, GiFamilyHouse, FaChild,