import { gql } from "@apollo/client";

export const MOVIE_API_QUERY = gql`
  query movie($genre: Int!) {
    movie(genre: $genre) {
      id
      original_title
      overview
      poster_path
      vote_average
    }
  }
`;

export const TV_API_QUERY = gql`
  query tvShow($genre: Int!) {
    tvShow(genre: $genre) {
      id
      name
      overview
      poster_path
      vote_average
    }
  }
`;

export const GAME_API_QUERY = gql`
  query game($genre: String!, $platform: Int!) {
    game(genre: $genre, platform: $platform) {
      id
      name
      rating
      background_image
    }
  }
`;

export const TRAILER_API_QUERY = gql`
  query trailer($mediaTitle: String!) {
    trailer(mediaTitle: $mediaTitle) {
      videoId
      title
    }
  }
`;

export const QUERY_POSTS = gql`
  query {
    posts {
      _id
      createdAt
      username
      postText
    }
  }
`;

export const QUERY_SELF = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      favoriteMovies {
        movieId
        movieName
        moviePoster
        movieDetails
        movieRating
      }
      favoriteTvShows {
        tvShowId
        tvShowName
        tvShowPoster
        tvShowDetails
        tvShowRating
      }
      favoriteGames {
        gameId
        gameName
        gamePoster
        gameRating
        gameDetails
      }
      createdPosts {
        username
        createdAt
        postText
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      favoriteMovies {
        movieId
        movieName
        moviePoster
        movieDetails
        movieRating
      }
      favoriteTvShows {
        tvShowId
        tvShowName
        tvShowPoster
        tvShowDetails
        tvShowRating
      }
      favoriteGames {
        gameId
        gameName
        gamePoster
        gameRating
        gameDetails
      }
      createdPosts {
        username
        createdAt
        postText
      }
    }
  }
`;
