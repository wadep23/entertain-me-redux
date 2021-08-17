import Carousel from "react-bootstrap/Carousel";
import gamerImgOne from "../assets/images/gamer-pic-1.jpg";
import movieImgOne from "../assets/images/movie-pic-1.jpg";
import tvPicOne from "../assets/images/tv-pic-1.jpg";
import logoImg from "../assets/images/entertain-me-logo.png";
import friendsImg from "../assets/images/friends-1.jpg";



function Login() {
  
  return (
    <div>
      <main>
        <br />
        <h2 className="intro-text">
         It can be a colossal waste of time trying to figure out what to watch or what game to play when there are too many to choose from. Entertain-Me facilitates the process, and connects users based on mutual interests. Are you not entertained? {" "}
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
                  Deciding what to watch doesn't have to be
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
                  Binge the shows that everyone is raving about!
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
                <h3>
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