import React from "react"; 
import { GiPistolGun, GiEarthAmerica, FaLaughSquint, FaHeart, RiAliensFill, GiGhost, FaSadCry, GiUnicorn, GiMagnifyingGlass, GiSwordwoman, ImPencil2, GiHandcuffs, BiCameraMovie, GiFamilyHouse, FaChild, GiNewspaper, BsFillPeopleFill, GiLightSabers, GiSoap, RiKakaoTalkLine, GoLaw, FaHatCowboy, GiSwordsPower, GiAudioCassette, GiSwordBrandish, FaDiceD20, GiChessRook, FaCrosshairs, BiCool, GiVrHeadset, FaPuzzlePiece, GiJoystick, GiRunningNinja, GiSteeringWheel, FaHeadset, IoAmericanFootballSharp, GiHighKick, FaChessBoard, GiBrain, GiCard2Hearts } from "react-icons/fa";

const GenreButtons = () => {

    const conditionalRender = () => {
        switch (currentCategory.name) {
            case 'Movies': 

                return <section id="movies">
                <container>
                <button type="button" id="Action" value="28"><GiPistolGun />Action</button>
                <button type="button" id="Adventure" value="12"><GiEarthAmerica />Adventure</button>
                <button type="button" id="Comedy" value="35"><FaLaughSquint />Comedy</button>
                <button type="button" id="Romance" value="10749"><FaHeart />Romance</button>
                <button type="button" id="Sci-Fi" value="878"><RiAliensFill />Sci-Fi</button>
                <button type="button" id="Horror" value="27"><GiGhost />Horror</button>
                <button type="button" id="Drama" value="18"><FaSadCry />Drama</button>
                <button type="button" id="Fantasy" value="14"><GiUnicorn />Fantasy</button>
                <button type="button" id="Mystery" value="9648"><GiMagnifyingGlass />Mystery</button>
                </container>
            </section>
            
            case 'Tv':
            
                return <section id="tv">
                <container>
                <button type="button" id="Action/Adventure" value="10759"><GiSwordwoman />Action/Adventure</button>
                <button type="button" id="Animation" value="16"><ImPencil2 />Animation</button>
                <button type="button" id="Comedy" value="35"><FaLaughSquint />Comedy</button>
                <button type="button" id="Crime" value="80"><GiHandcuffs />Crime</button>
                <button type="button" id="Documentary" value="99"><BiCameraMovie />Sci-Fi</button>
                <button type="button" id="Horror" value="27"><GiGhost />Horror</button>
                <button type="button" id="Drama" value="18"><FaSadCry />Drama</button>
                <button type="button" id="Family" value="10751"><GiFamilyHouse />Family</button>
                <button type="button" id="Kids" value="10762"><FaChild />Kids</button>
                <button type="button" id="Mystery" value="9648"><GiMagnifyingGlass />Mystery</button>
                <button type="button" id="News" value="10763"><GiNewspaper />News</button>
                <button type="button" id="Reality" value="10764"><BsFillPeopleFill />Reality</button>
                <button type="button" id="SciFiFantasy" value="10765"><GiLightSabers />Sci-Fi/Fantasy</button>
                <button type="button" id="Soap" value="10766"><GiSoap />Soap</button>
                <button type="button" id="Talk" value="10767"><RiKakaoTalkLine />Talk</button>
                <button type="button" id="WarPolitics" value="10768"><GoLaw />Mystery</button>
                <button type="button" id="Western" value="37"><FaHatCowboy />Western</button>
                </container>
            </section>

            case 'Video Games':

                return <section id="video-games">
                <container>
                <button type="button" id="action" value="action"><GiSwordsPower />Action</button>
                <button type="button" id="indie" value="indie"><GiAudioCassette/>Indie</button>
                <button type="button" id="adventure" value="adventure"><GiSwordBrandish />Adventure</button>
                <button type="button" id="rpg" value="rpg"><FaDiceD20 />RPG</button>
                <button type="button" id="strategy" value="strategy"><GiChessRook />Strategy</button>
                <button type="button" id="shooter" value="shooter"><FaCrosshairs />FPS/Shooter</button>
                <button type="button" id="casual" value="casual"><BiCool />Casual</button>
                <button type="button" id="simulation" value="simulation"><GiVrHeadset />Simulation</button>
                <button type="button" id="puzzle" value="puzzle"><FaPuzzlePiece />Puzzle</button>
                <button type="button" id="arcade" value="arcade"><GiJoystick/>Arcade</button>
                <button type="button" id="platformer" value="platformer"><GiRunningNinja />Platformer</button>
                <button type="button" id="racing" value="racing"><GiSteeringWheel />Racing</button>
                <button type="button" id="massively-multiplayer" value="massively-multiplayer"><FaHeadset />Massively-Multiplayer</button>
                <button type="button" id="sports" value="sports"><IoAmericanFootballSharp />Sports</button>
                <button type="button" id="fighting" value="fighting"><GiHighKick />Fighting</button>
                <button type="button" id="family" value="family"><GiFamilyHouse />Family</button>
                <button type="button" id="board-games" value="board-games"><FaChessBoard/>Board Games</button>
                <button type="button" id="educational" value="educational"><GiBrain />Education</button>
                <button type="button" id="card" value="card"><GiCard2Hearts />Card</button>
                </container>
            </section>
            
            
            default:
                return <Login />
        }
    }
    return <h1>{conditionalRender()}</h1>;
}

export default GenreButtons; 











