import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      username
      createdAt
      postText
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie(
    $movieId: ID!
    $movieName: String!
    $moviePoster: String
    $movieDetails: String!
    $movieRating: Float
  ) {
    saveMovie(
      movieId: $movieId
      movieName: $movieName
      moviePoster: $moviePoster
      movieDetails: $movieDetails
      movieRating: $movieRating
    ) {
      _id
      username
      favoriteMovies {
        movieId
        movieName
        moviePoster
        movieDetails
        movieRating
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID!) {
    removeMovie(moviedId: $moviedId) {
      _id
      username
      favoriteMovies {
        movieId
      }
    }
  }
`;

export const SAVE_TV_SHOW = gql`
  mutation saveTvShow(
    $tvShowId: ID!
    $tvShowName: String!
    $tvShowPoster: String
    $tvShowDetails: String!
    $tvShowRating: Float
  ) {
    saveTvShow(
      tvShowId: $tvShowId
      tvShowName: $tvShowName
      tvShowPoster: $tvShowPoster
      tvShowDetails: $tvShowDetails
      tvShowRating: $tvShowRating
    ) {
      _id
      username
      favoriteTvShows {
        tvShowId
        tvShowName
        tvShowPoster
        tvShowDetails
        tvShowRating
      }
    }
  }
`;

export const REMOVE_TV_SHOW = gql`
  mutation removeTvShow($tvShowId: ID!) {
    removeTvShow(tvShowdId: $tvShowdId) {
      _id
      username
      favoriteTvShows {
        tvShowId
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation savegame(
    $gameId: ID!
    $gameName: String!
    $gamePoster: String
    $gameRating: Float
  ) {
    savegame(
      gameId: $gameId
      gameName: $gameName
      gamePoster: $gamePoster
      movieRating: $movieRating
    ) {
      _id
      username
      favoritegames {
        gameId
        gameName
        gamePoster
        gameRating
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
      _id
      username
      favoriteGames {
        gameId
      }
    }
  }
`;