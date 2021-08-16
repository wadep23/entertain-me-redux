import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { FaLaughSquint, FaSadCry, FaChild, FaHatCowboy } from "react-icons/fa";
import { GiSwordwoman, GiHandcuffs, GiGhost, GiFamilyHouse, GiMagnifyingGlass, GiNewspaper, GiLightSabers, GiSoap } from "react-icons/gi";
import { RiKakaoTalkLine } from "react-icons/ri";
import { BiCameraMovie } from "react-icons/bi";
import { BsFillPeopleFill, BsPencil } from "react-icons/bs";
import { GoLaw } from "react-icons/go";









const Tv = props => {
  

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing television search.
        </h2>
        <section id="tvButtons">
          <container>
            <button type="button" id="Action/Adventure" value="10759"><GiSwordwoman /> Action/Adventure</button>
            <button type="button" id="Animation" value="16"><BsPencil /> Animation</button>
            <button type="button" id="Comedy" value="35"><FaLaughSquint /> Comedy</button>
            <button type="button" id="Crime" value="80"><GiHandcuffs /> Crime</button>
            <button type="button" id="Documentary" value="99"><BiCameraMovie /> Documentary</button>
            <button type="button" id="Horror" value="27"><GiGhost /> Horror</button>
            <button type="button" id="Drama" value="18"><FaSadCry /> Drama</button>
            <button type="button" id="Family" value="10751"><GiFamilyHouse /> Family</button>
            <button type="button" id="Kids" value="10762"><FaChild /> Kids</button>
            <button type="button" id="Mystery" value="9648"><GiMagnifyingGlass /> Mystery</button>
            <button type="button" id="News" value="10763"><GiNewspaper /> News</button>
            <button type="button" id="Reality" value="10764"><BsFillPeopleFill /> Reality</button>
            <button type="button" id="SciFiFantasy" value="10765"><GiLightSabers /> Sci-Fi/Fantasy</button>
            <button type="button" id="Soap" value="10766"><GiSoap /> Soap</button>
            <button type="button" id="Talk" value="10767"><RiKakaoTalkLine /> Talk</button>
            <button type="button" id="WarPolitics" value="10768"><GoLaw /> War & Politics</button>
            <button type="button" id="Western" value="37"><FaHatCowboy /> Western</button>
          </container>
        </section>
        <button className="btn ml-auto">
          Add Friend
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

export default Tv;