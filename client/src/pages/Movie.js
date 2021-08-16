import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { FaLaughSquint, FaHeart, FaSadCry, FaRegPlayCircle } from "react-icons/fa";
import { GiFilmProjector, GiPistolGun, GiEarthAmerica, GiGhost, GiUnicorn, GiMagnifyingGlass, GiTheaterCurtains } from "react-icons/gi";
import { RiAliensFill } from "react-icons/ri";









const Movie = props => {
  

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          <GiFilmProjector /> Viewing movie search.
        </h2>
        <section id="movieButtons">
                <container>
                <button type="button" value="theaters"><GiTheaterCurtains /> Amphitheatre</button>
                <button type="button" value="streaming"><FaRegPlayCircle /> Streaming</button>
                </container>
                <br />
                <br />
                <container>
                <button type="button" id="Action" value="28"><GiPistolGun /> Action</button>
                <button type="button" id="Adventure" value="12"><GiEarthAmerica /> Adventure</button>
                <button type="button" id="Comedy" value="35"><FaLaughSquint /> Comedy</button>
                <button type="button" id="Romance" value="10749"><FaHeart /> Romance</button>
                <button type="button" id="Sci-Fi" value="878"><RiAliensFill /> Sci-Fi</button>
                <button type="button" id="Horror" value="27"><GiGhost /> Horror</button>
                <button type="button" id="Drama" value="18"><FaSadCry /> Drama</button>
                <button type="button" id="Fantasy" value="14"><GiUnicorn /> Fantasy</button>
                <button type="button" id="Mystery" value="9648"><GiMagnifyingGlass /> Mystery</button>
                </container>
            </section>
        <button className="btn ml-auto">
          Add Favorite
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

export default Movie;