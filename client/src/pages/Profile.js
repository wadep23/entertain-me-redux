import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import {
  ADD_FRIEND,
  REMOVE_MOVIE,
  REMOVE_TV_SHOW,
  REMOVE_GAME,
} from "../utils/mutations";
import { QUERY_SELF, QUERY_USER } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  CardColumns,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import MovieModal from '../components/MovieModal';
import TvModal from '../components/TvModal';
import GameModal from '../components/GameModal';
import FriendList from "../components/FriendsList";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const [showMovieTrailerModal, setShowMovieTrailerModal] = useState(false);
  const [movieTrailerModalTitle, setMovieTrailerModalTitle] = useState('');
  const [showTvTrailerModal, setShowTvTrailerModal] = useState(false);
  const [tvTrailerModalTitle, setTvTrailerModalTitle] = useState('');
  const [showGameTrailerModal, setShowGameTrailerModal] = useState(false);
  const [gameTrailerModalTitle, setGameTrailerModalTitle] = useState('');

  const [addFriend] = useMutation(ADD_FRIEND);
  const [deleteContent] = useMutation(
    REMOVE_MOVIE,
    REMOVE_TV_SHOW,
    REMOVE_GAME
  );
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_SELF , {
    variables: { username: userParam },
  });

  const userData = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getUserData().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Please select log in or sign up to
        view user profile page!
      </h4>
    );
  }

  console.log(userData)
  // change the passed in value to something that can be unique to the content type ie. passed in value of mediaType and compare to favorite media array on user model
  const handleDeleteContent = async () => {
    const token = Auth.loggedIn() ? Auth.retrieveToken() : null;

    const movieId =
      userData.favoriteMovies.movieId
    const tvShowId =
      userData.favoriteTvShows.tvShowId;
    const gameId =
      userData.favoriteGames.gameId;

    if (!token) {
      return false;
    }

    if (movieId) {
      await deleteContent({
        variables: { movieId: movieId },
        update: (cache) => {
          const data = cache.readQuery({ query: QUERY_SELF });
          const userDataCache = data.me;
          const savedMovieCache = userDataCache.favoriteMovies;
          const updatedMoviesCache = savedMovieCache.filter(
            (movie) => movie.movieId !== movieId
          );
          data.me.favoriteMovies = updatedMoviesCache;
          cache.writeQuery({
            query: QUERY_SELF,
            data: { data: { ...data.me.favoriteMovies } },
          });
        },
      });
    }
    if (tvShowId) {
      await deleteContent({
        variables: { tvShowId: tvShowId },
        update: (cache) => {
          const data = cache.readQuery({ query: QUERY_SELF });
          const userDataCache = data.me;
          const savedTvShowCache = userDataCache.favoriteTvShows;
          const updatedTvShowCache = savedTvShowCache.filter(
            (tv) => tv.tvShowId !== tvShowId
          );
          data.me.favoriteTvShows = updatedTvShowCache;
          cache.writeQuery({
            query: QUERY_SELF,
            data: { data: { ...data.me.favoriteTvShows } },
          });
        },
      });
    }
    if (gameId) {
      await deleteContent({
        variables: { gameId: gameId },
        update: (cache) => {
          const data = cache.readQuery({ query: QUERY_SELF });
          const userDataCache = data.me;
          const savedGameCache = userDataCache.favoriteGames;
          const updatedGamesCache = savedGameCache.filter(
            (game) => game.gameId !== gameId
          );
          data.me.favoriteGames = updatedGamesCache;
          cache.writeQuery({
            query: QUERY_SELF,
            data: { data: { ...data.me.favoriteGames } },
          });
        },
      });
    }
  };

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: userData._id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            Welcome to {userParam ? `${userData.username}'s` : 'your'} Profile!
          </h2>
        </div>
        <div className="btn-loc">
          {userParam && (
            <button onClick={handleClick} size="lg">
              Add Friend
            </button>
          )}
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList 
            username={userData.username}
            friendCount={userData.friendCount}
            friends={userData.friends}
          />
        </div>
      <Container>
        <h2>
          {userData.favoriteMovies.length
            ? `Viewing ${userData.favoriteMovies.length} saved ${
              userData.favoriteMovies.length === 1 ? "Movie" : "Movies"
              }:`
              : "You have no saved Movies!"}
        </h2>
        <Row fluid="true">
          {userData.favoriteMovies.map((user) => {
            return (
              <Col sm={3}>
                <Card key={user.movieId} style={{ width: '18rem' }}>
                  <Card.Img src={user.moviePoster} alt={`The poster for ${user.movieName}`} variant="top" />
                  <Card.Body className="card-body">
                      <Card.Title>{user.movieName}</Card.Title>
                      <Card.Text>{user.movieDetails}</Card.Text>
                      <Card.Text>Rating: {user.movieRating}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button className="btn-block btn-danger"
                        onClick={() => handleDeleteContent(user.movieId)}
                        >Delete this Movie!
                        </Button>
                      )}
                        <Button variant="primary" 
                          onClick={() => {setShowMovieTrailerModal(true)
                            setMovieTrailerModalTitle(user.movieName + " Movie Trailer"); }}
                          >Watch a trailer!
                        </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <MovieModal
        showMovieTrailerModal={showMovieTrailerModal}
        setShowMovieTrailerModal={setShowMovieTrailerModal}
        movieTrailerModalTitle={movieTrailerModalTitle}
        setMovieTrailerModalTitle={setMovieTrailerModalTitle}
        ></MovieModal>  
      <Container>
        <h2>
          {userData.favoriteTvShows.length
            ? `Viewing ${userData.favoriteTvShows.length} saved ${
              userData.favoriteTvShows.length === 1 ? "T.V. show" : "T.V. shows"
              }:`
            : "You have no saved T.V. Shows!"}
        </h2>
        <Row fluid="true">
          {userData.favoriteTvShows.map((user) => {
            return (
              <Col sm={3}>
                <Card key={user.tvShowId} style={{ width: '18rem' }}>
                  <Card.Img src={user.tvShowPoster} alt={`The poster for ${user.tvShowName}`} variant="top" />
                  <Card.Body className="card-body">
                    <Card.Title>{user.tvShowName}</Card.Title>
                    <Card.Text>{user.tvShowDetails}</Card.Text>
                    <Card.Text>Rating: {user.tvShowRating}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button className="btn-block btn-danger"
                      onClick={() => handleDeleteContent(user.tvShowId)}
                      >
                        Delete this T.V. Show!
                      </Button>
                    )}
                    <Button variant="primary" onClick={() => {setShowTvTrailerModal(true)
                    setTvTrailerModalTitle(user.tvShowName + " Show Trailer"); }}
                    >Watch a trailer!</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <TvModal
        showTvTrailerModal={showTvTrailerModal}
        setShowTvTrailerModal={setShowTvTrailerModal}
        tvTrailerModalTitle={tvTrailerModalTitle}
        setTvTrailerModalTitle={setTvTrailerModalTitle}
        ></TvModal>
      <Container>
        <h2>
          {userData.favoriteGames.length
            ? `Viewing ${userData.favoriteGames.length} saved ${
              userData.favoriteGames.length === 1 ? "game" : "games"
            }:`
            : "You have no saved Games!"}
        </h2>
        <Row fluid="true">
          {userData.favoriteGames.map((user) => {
            return (
              <Col sm={3}>
                <Card key={user.gameId} style={{ width: '18rem' }}>
                  <Card.Img src={user.gamePoster} alt={`The poster for ${user.gameName}`} variant="top" />
                  <Card.Body className="card-body">
                  <Card.Title>{user.gameName}</Card.Title>
                    <Card.Text>Rating: {user.gameRating}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button className="btn-block btn-danger"
                      onClick={() => handleDeleteContent(user.tvShowId)}
                      >
                      Delete this Game!
                    </Button>
                    )}
                    <Button variant="primary" 
                    onClick={() => {setShowGameTrailerModal(true)
                    setGameTrailerModalTitle(user.gameName + " game Trailer"); }}
                    >
                      Watch a trailer!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>   
            );
          })}
        </Row>
      </Container>
      <GameModal
        showGameTrailerModal={showGameTrailerModal}
        setShowGameTrailerModal={setShowGameTrailerModal}
        gameTrailerModalTitle={gameTrailerModalTitle}
        setGameTrailerModalTitle={setGameTrailerModalTitle}
      ></GameModal> 
      </div>
    </main>
  );
};

export default Profile;
