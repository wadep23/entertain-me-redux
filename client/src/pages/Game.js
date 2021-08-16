import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { GiSwordsPower, GiAudioCassette, GiSwordBrandish, GiChessRook, GiFamilyHouse, GiVrHeadset, GiJoystick, GiRunningNinja, GiSteeringWheel, GiHighKick, GiBrain, GiCard2Hearts } from "react-icons/gi";
import { FaDiceD20, FaCrosshairs, FaPuzzlePiece, FaHeadset, FaChessBoard } from "react-icons/fa";
import { BiCool } from "react-icons/bi";
import { IoAmericanFootballSharp } from "react-icons/io5";









const Game = props => {
  

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing game search.
        </h2>
        <section id="video-games">
          <container>
            <button type="button" id="action" value="action"><GiSwordsPower /> Action</button>
            <button type="button" id="indie" value="indie"><GiAudioCassette /> Indie</button>
            <button type="button" id="adventure" value="adventure"><GiSwordBrandish /> Adventure</button>
            <button type="button" id="rpg" value="rpg"><FaDiceD20 /> RPG</button>
            <button type="button" id="strategy" value="strategy"><GiChessRook /> Strategy</button>
            <button type="button" id="shooter" value="shooter"><FaCrosshairs /> FPS/Shooter</button>
            <button type="button" id="casual" value="casual"><BiCool /> Casual</button>
            <button type="button" id="simulation" value="simulation"><GiVrHeadset /> Simulation</button>
            <button type="button" id="puzzle" value="puzzle"><FaPuzzlePiece /> Puzzle</button>
            <button type="button" id="arcade" value="arcade"><GiJoystick /> Arcade</button>
            <button type="button" id="platformer" value="platformer"><GiRunningNinja /> Platformer</button>
            <button type="button" id="racing" value="racing"><GiSteeringWheel /> Racing</button>
            <button type="button" id="massively-multiplayer" value="massively-multiplayer"><FaHeadset /> Massively-Multiplayer</button>
            <button type="button" id="sports" value="sports"><IoAmericanFootballSharp /> Sports</button>
            <button type="button" id="fighting" value="fighting"><GiHighKick /> Fighting</button>
            <button type="button" id="family" value="family"><GiFamilyHouse /> Family</button>
            <button type="button" id="board-games" value="board-games"><FaChessBoard /> Board Games</button>
            <button type="button" id="educational" value="educational"><GiBrain /> Education</button>
            <button type="button" id="card" value="card"><GiCard2Hearts /> Card</button>
          </container>
        </section>
        <button className="btn ml-auto">
          Add favorite
        </button>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          
        </div>

        <div className="col-12 col-lg-3 mb-3">
        </div>
      </div>
      <div></div>
    </div>
)};

export default Game;