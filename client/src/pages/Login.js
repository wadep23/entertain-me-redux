import { Redirect } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import gamerImgOne from "../assets/images/gamer-pic-1.jpg";
import movieImgOne from "../assets/images/movie-pic-1.jpg";
import tvPicOne from "../assets/images/tv-pic-1.jpg";
import friendsImg from "../assets/images/friends-1.jpg";
import auth from '../utils/auth';

function Login() {

  if (auth.loggedIn()) {
    return <Redirect to ="/home" />
  }
  
  
  return (
    <div>
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
        </div>
      </main>
    </div>
  );
}

export default Login;
