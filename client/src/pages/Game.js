import React, { useState } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { FaDiceD20, FaCrosshairs, FaPuzzlePiece, FaChessBoard, FaHeadset, FaPlaystation, FaXbox, FaMouse } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { GiPunchBlast, GiAudioCassette, GiAxeSword, GiChessRook, GiBrain, GiCard2Hearts, GiFamilyHouse, GiVrHeadset, GiSteeringWheel, GiHighKick, GiFloatingPlatforms } from "react-icons/gi";
import { BiCool, BiGame } from "react-icons/bi";
import { IoAmericanFootballSharp } from "react-icons/io5"; 
import { Redirect } from 'react-router';
import auth from '../utils/auth';
import { IoGameController } from "react-icons/io5";
import SearchGames from '../components/Game'

const Game = () => {
  const [platformInt, setPlatformInt] = useState('');
  const [genreString, setGenreString] = useState('');

  const handleButtonPlatformClick = (platformInt) => {
    const dataInt = parseInt(platformInt)

    setPlatformInt(dataInt)
  }

  const handleButtonGenreClick = (genreString) => {
    setGenreString(genreString)
  }

  if (!auth.loggedIn()) {
    return <Redirect to ="/" />
  }
  
  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            <IoGameController /> Select Platform & Game genre:
          </h2>
          <Container>
                <Row fluid>
                    <Col>
                        <button value="2" onClick={(j) => handleButtonPlatformClick(j.target.value)} 
                        ><FaPlaystation />  Playstation</button>
                    </Col>
                    <Col>
                        <button value="3" onClick={(j) => handleButtonPlatformClick(j.target.value)}
                        ><FaXbox />  XBOX </button>
                    </Col>
                    <Col>
                        <button value="1" onClick={(j) => handleButtonPlatformClick(j.target.value)}
                        ><FaMouse />  PC</button>
                    </Col>
                    <Col>
                        <button value="7" onClick={(j) => handleButtonPlatformClick(j.target.value)}
                        ><SiNintendoswitch />  Nintendo</button>
                    </Col>
                </Row>
                {platformInt && (
                  <Row fluid>
                  <Col>
                      <button onClick={(j) => handleButtonGenreClick(j.target.value)}
                      ><GiPunchBlast /> Action</button>
                  </Col>
                  <Col>
                      <button value="indie" onClick={(j) => handleButtonGenreClick(j.target.value)}
                      ><GiAudioCassette/> Indie</button>
                  </Col>
                  <Col>
                      <button value="adventure" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiAxeSword /> Adventure</button>
                  </Col>
                  <Col>
                      <button value="role-playing-games-rpg" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><FaDiceD20 /> RPG</button>
                  </Col>
                  <Col>
                      <button value="strategy" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiChessRook /> Strategy</button>
                  </Col>
                  <Col>
                      <button value="shooter" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><FaCrosshairs /> FPS/Shooter</button>
                  </Col>
                  <Col>
                      <button value="casual" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><BiCool /> Casual</button>
                  </Col>
                  <Col>
                      <button value="simulation" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiVrHeadset /> Simulation</button>
                  </Col>
                  <Col>
                      <button value="puzzle" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><FaPuzzlePiece /> Puzzle</button>
                  </Col>
                  <Col>
                      <button value="arcade" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><BiGame/> Arcade</button>
                  </Col>
                  <Col>
                      <button value="platformer" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiFloatingPlatforms /> Platformer</button>
                  </Col>
                  <Col>
                      <button value="racing" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiSteeringWheel /> Racing</button>
                  </Col>
                  <Col>
                      <button value="massively-multiplayer" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><FaHeadset /> MMO</button>
                  </Col>
                  <Col>
                      <button value="sports" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><IoAmericanFootballSharp /> Sports</button>
                  </Col>
                  <Col>
                      <button value="fighting" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiHighKick /> Fighting</button>
                  </Col>
                  <Col>
                      <button value="family" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiFamilyHouse /> Family</button>
                  </Col>
                  <Col>
                      <button value="board-games" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><FaChessBoard/> Board Games</button>
                  </Col>
                  <Col>
                      <button value="educational" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiBrain /> Education</button>
                  </Col>
                  <Col>
                      <button value="card" onClick={(j) => handleButtonGenreClick(j.target.value)}
                       ><GiCard2Hearts /> Card</button>
                  </Col>
              </Row>
                )}
            </Container>
          <SearchGames
            platformInt={platformInt}
            genreString={genreString}
          >
          </SearchGames>
        </div>
      </div>
    </main>
  )};

export default Game;