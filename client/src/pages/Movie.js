import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import SearchMedia from '../components/Media'

const Movie = () => {
  const [genreState, setGenreState] = useState('')

  // const handleButtonClick = async (event) => {
  //   event.preventDefault();
  //   let genre;

  //   if (document.getElementById())
  // };
  
  return (
    <main>
      <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          So, you need a movie to watch? Click on a genre below and watch the magic happen!
        </h2>
        <Container>
          <Row>
            <Col>
              <button value="27" onClick={(j) => setGenreState(j.target.value)}>Horror</button>
            </Col>
            <Col>
              <button value="28" onClick={(j) => setGenreState(j.target.value)}>Action</button>
            </Col>
            <Col>
              <button value="12" onClick={(j) => setGenreState(j.target.value)}>Adventure</button>
            </Col>
            <Col>
              <button value="10749" onClick={(j) => setGenreState(j.target.value)}>Romance</button>
            </Col>
            <Col>
              <button value="878" onClick={(j) => setGenreState(j.target.value)}>Sci-Fi</button>
            </Col>
            <Col>
              <button value="18" onClick={(j) => setGenreState(j.target.value)}>Drama</button>
            </Col>
            <Col>
              <button value="14" onClick={(j) => setGenreState(j.target.value)}>Fantasy</button>
            </Col>
            <Col>
              <button value="9648" onClick={(j) => setGenreState(j.target.value)}>Mystery</button>
            </Col>
            <Col>
              <button value="35" onClick={(j) => setGenreState(j.target.value)}>Comedy</button>
            </Col>
          </Row>
          <Row>
            <SearchMedia
              genreState={genreState}
              setGenreState={setGenreState}
            ></SearchMedia>
          </Row>
        </Container>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          
        </div>

        <div className="col-12 col-lg-3 mb-3">
        </div>
      </div>
      <div></div>
    </div>
    </main>
    
)};

export default Movie;