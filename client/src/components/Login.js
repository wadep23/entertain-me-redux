import Carousel from "react-bootstrap/Carousel";
import gamerImgOne from "../assets/images/gamer-pic-1.jpg";
import movieImgOne from "../assets/images/movie-pic-1.jpg";
import tvPicOne from "../assets/images/tv-pic-1.jpg";
import logoImg from "../assets/images/entertain-me-logo.png";
import friendsImg from "../assets/images/friends-1.jpg";
// import { Form, Button, Alert } from 'react-bootstrap';
import { gameQuery, movieQuery, testVideo } from "../utils/API";
const movie_key = process.env.REACT_APP_GAME_API_KEY

function Login() {
  // const [isModalOpen]

  const clickHandler = async (event) => {
    event.preventDefault();
    
    
    try {
      const response = await testVideo("Portal game trailer");
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      console.log(data)

      document.getElementById("video").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <header>
        <h3 className="login-page">Log Me In!</h3>
        <h3 className="signup-top">Sign Me Up!</h3>
        <img src={logoImg} alt="logo"></img>
        <h4>Your go-to site when you just don't know what to watch!</h4>
        <button onClick={clickHandler}>Movie Query Test</button>
        <div className="video-box">
          <iframe title="youtube" id="video" className="video">Hello</iframe>
        </div>
        
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
                  Movies are great and deciding what to watch doesn't have to be
                  difficult. We are here for you!
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
                  Everyone loves to watch TV! We can help you pick the next best
                  show to watch!
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
  );
}

export default Login;
