import { useParams } from "react-router-dom";
import {
  ADD_FRIEND,
  REMOVE_MOVIE,
  REMOVE_TV_SHOW,
  REMOVE_GAME,
} from "../../utils/mutations";
import { QUERY_SELF } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { removeMediaId } from "../../utils/saveMedia";
import Auth from "../../utils/auth";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const [deleteContent] = useMutation(
    REMOVE_MOVIE,
    REMOVE_TV_SHOW,
    REMOVE_GAME
  );
  const { loading, data } = useQuery(userParam ? QUERY_SELF : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Please select log in or sign up to
        view user profile page!
      </h4>
    );
  }
  // change the passed in value to something that can be unique to the content type ie. passed in value of mediaType and compare to favorite media array on user model
  const handleDeleteContent = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const { movieId, tvShowId, gameId } = useQuery(GET_SELF);

    if (!token) {
      return false;
    }

    if (movieId) {
      await deleteContent({
        variables: { movieId: movieId },
        update: (cache) => {
          const data = cache.readQuery({ query: GET_SELF });
          const userDataCache = data.me;
          const savedMovieCache = userDataCache.favoriteMovies;
          const updatedMoviesCache = savedMovieCache.filter(
            (movie) => movie.movieId !== movieId
          );
          data.me.favoriteMovies = updatedMoviesCache;
          cache.writeQuery({
            query: GET_SELF,
            data: { data: { ...data.me.favoriteMovies } },
          });
        },
      });
      removeMediaId(movieId);
    }
    if (tvShowId) {
      await deleteContent({
        variables: { tvShowId: tvShowId },
        update: (cache) => {
          const data = cache.readQuery({ query: GET_SELF });
          const userDataCache = data.me;
          const savedTvShowCache = userDataCache.favoriteTvShows;
          const updatedTvShowCache = savedTvShowCache.filter(
            (tv) => tv.tvShowId !== tvShowId
          );
          data.me.favoriteTvShows = updatedTvShowCache;
          cache.writeQuery({
            query: GET_SELF,
            data: { data: { ...data.me.favoriteTvShows } },
          });
        },
      });
      removeMediaId(tvShowId);
    }
    if (gameId) {
      await deleteContent({
        variables: { gameId: gameId },
        update: (cache) => {
          const data = cache.readQuery({ query: GET_SELF });
          const userDataCache = data.me;
          const savedGameCache = userDataCache.favoriteGames;
          const updatedGamesCache = savedGameCache.filter(
            (game) => game.gameId !== gameId
          );
          data.me.favoriteGames = updatedGamesCache;
          cache.writeQuery({
            query: GET_SELF,
            data: { data: { ...data.me.favoriteGames } },
          });
        },
      });
      removeMediaId(gameId);
    }
  };

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h2>{`${user.username}'s`} Profile</h2>
          {userParam && (
            <button className="btn" onClick={handleClick}>
              Add Friend
            </button>
          )}
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.favoriteMovies.length
            ? `Viewing ${userData.favoriteMovies.length} saved ${
                userData.favoriteMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.favoriteMovies.map((user) => {
            return (
              <Card key={user.movieId} border="dark">
                {user.moviePoster ? (
                  <Card.Img
                    src={user.moviePoster}
                    alt={`The cover for ${user.movieName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{user.movieName}</Card.Title>
                  <Card.Text>{user.movieDetails}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteContent(user.movieId)}
                  >
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <Container>
        <h2>
          {userData.favoriteTvShows.length
            ? `Viewing ${userData.favoriteTvShows.length} saved ${
                userData.favoriteTvShows.length === 1 ? "tv show" : "tv shows"
              }:`
            : "You have no saved Tv Shows!"}
        </h2>
        <CardColumns>
          {userData.favoriteTvShows.map((user) => {
            return (
              <Card key={user.tvShowId} border="dark">
                {user.tvShowPoster ? (
                  <Card.Img
                    src={user.tvShowPoster}
                    alt={`The cover for ${user.tvShowName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{user.tvShowName}</Card.Title>
                  <Card.Text>{user.tvShowDetails}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteContent(user.tvShowId)}
                  >
                    Delete this Tv Show!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <Container>
        <h2>
          {userData.favoriteGames.length
            ? `Viewing ${userData.favoriteGames.length} saved ${
                userData.favoriteGames.length === 1 ? "game" : "games"
              }:`
            : "You have no saved Games!"}
        </h2>
        <CardColumns>
          {userData.favoriteGames.map((user) => {
            return (
              <Card key={user.gameId} border="dark">
                {user.gamePoster ? (
                  <Card.Img
                    src={user.gamePoster}
                    alt={`The cover for ${user.gameName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{user.gameName}</Card.Title>
                  <Card.Text>{user.gameDetails}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteContent(user.gameId)}
                  >
                    Delete this Game!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Profile;
