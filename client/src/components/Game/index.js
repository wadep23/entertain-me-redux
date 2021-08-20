import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Container, Col } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_GAME, ADD_POST } from '../../utils/mutations';
import { GAME_API_QUERY }from '../../utils/queries';
import GameModal from '../GameModal';
import Auth from '../../utils/auth';

const SearchGames = (props) => {
    const { platformInt, genreString } = props;
    const [showGameTrailerModal, setShowGameTrailerModal] = useState(false);
    const [gameTrailerModalTitle, setGameTrailerModalTitle] = useState('');
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState({});

    const { loading, data } = useQuery(GAME_API_QUERY, {
        variables: { genre: genreString, platform: platformInt}
    });
    
    const [saveGame] = useMutation(SAVE_GAME);
    const [createPost] = useMutation(ADD_POST);

    
    useEffect(() => {
        if (data) {
            let gameData = data.game.map((game) => ({
                gameId: game.id,
                gameName: game.name,
                gameRating: game.rating,
                gamePoster: game.background_image
            }));
            setSearchedMedia(gameData) 
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSaveMedia = async (gameId) => {
        const gameToSave = searchedMedia.find((media) => media.gameId === gameId);
        
        
        try {
            await saveGame({
                variables: {
                    gameId: gameToSave.gameId,
                    gameName: gameToSave.gameName,
                    gamePoster: gameToSave.gamePoster,
                    gameRating: gameToSave.gameRating
                }
            })

            await createPost({
                variables: {
                  postText: ` saved ${gameToSave.gameName} to their favorite games!`  
                }
            })

            setSavedMedia([...savedMedia, gameToSave.gameId])
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div class="return-data">
            <Container>
                <Row>
                    {searchedMedia.map((games) => {
                        return (
                            <Col sm={3}>
                                <Card key={games.gameId} style={{ width: '18rem' }}>
                                    <Card.Img src={games.gamePoster} alt={`The poster for ${games.gameName}`} variant="top" />
                                    <Card.Body className="card-body">
                                        <Card.Title>{games.gameName}</Card.Title>
                                        <Card.Text>Rating: {games.gameRating}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button variant="primary" onClick={() => {handleSaveMedia(games.gameId); }}>Save to your favorites!</Button>
                                        )}
                                        <Button variant="primary" onClick={() => {setShowGameTrailerModal(true)
                                         setGameTrailerModalTitle(games.gameName + " game Trailer"); }}
                                        >Watch a trailer!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>   
                        )   
                    })}  
                </Row>
            </Container>
            <GameModal
                showGameTrailerModal={showGameTrailerModal}
                setShowGameTrailerModal={setShowGameTrailerModal}
                gameTrailerModalTitle={gameTrailerModalTitle}
                setGameTrailerModalTitle={setGameTrailerModalTitle}
            ></GameModal>    
        </div>
    );
};

export default SearchGames;