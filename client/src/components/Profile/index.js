import { useParams } from "react-router-dom";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_SELF } from "../../utils/queries";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { removeMediaId } from "../../utils/saveMedia";

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
  const handleDeleteContent = async (movieId, tvShowId, gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (movieId) {
      const deleteMovie = await deleteContent({
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
      const deleteTvShow = await deleteContent({
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
    if (movieId) {
      const deleteMovie = await deleteContent({
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

  return (
    <div>
      <div>
        <h2>{`${user.username}'s`} Profile</h2>

        {userParam && (
          <button className="btn" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default Profile;
