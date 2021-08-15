import React from 'react';
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
<<<<<<< HEAD
import Navbar from "./components/Navbar";




require('dotenv').config()
=======
require("dotenv").config();
>>>>>>> 76c30e65696e02656a8a2a2000907aca671803b0

function App() {
  return (

    <div>
      <Navbar />
<<<<<<< HEAD
      <Login />
      <SignUp />
=======
      <div>
        <header>
          <h3 className="login-page">Log Me In!</h3>
          <h3 className="signup-top">Sign Me Up!</h3>
          <img src={logoImg} alt="logo"></img>
          <h4>Your go-to site when you just don't know what to watch!</h4>
        </header>

        <main>
          <h2 className="intro-text">
            With all of the options nowadays, it's hard to decide what game to
            play or what show to watch. We at Entertain Me specialize in helping
            you decide and you can make friends along the way. Check us out!{" "}
          </h2>
          <div className="carousel-container">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={gamerImgOne}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>What game would you like to play today? Let us help!</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={movieImgOne}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>
                    Movies are great and deciding what to watch doesn't have to
                    be difficult. We are here for you!
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  fluid
                  className="d-block w-100"
                  src={tvPicOne}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>
                    Everyone loves to watch TV! We can help you pick the next
                    best show to watch!
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  fluid
                  className="d-block w-100"
                  src={friendsImg}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3 style={{ color: "black" }}>
                    Make friends, discuss your favorite media!
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <h3 className="signup-bottom">Sign Me Up!</h3>
          </div>
        </main>
      </div>
>>>>>>> 76c30e65696e02656a8a2a2000907aca671803b0
    </div>
    
  );
}

export default App;
