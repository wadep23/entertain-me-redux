const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
      _id: ID
      username: String
      email: String
      friendCount: Int
      friends: [User]
      favoriteMovies: [Movie]
      favoriteTvShows: [TV]
      createdPosts: [Post]
    }

    type Movie {
        movieId: ID
        movieName: String
        moviePoster: String
        movieDetails: String
        movieRating: String
    }

    type TV {
        tvShowId: ID
        tvShowName: String
        tvShowPoster: String
        tvShowDetails: String
        tvShowRating: String
    }

    type VideoGame {
      gameId: ID
      gameName: String
      gamePoster: String
      gameRating: String
    }

    type Post {
      _id: ID
      username: String
      createdAt: String
      postText: String
    }

    type movieSearch {
      id: ID
      original_title: String
      overview: String
      poster_path: String
      vote_average: Float
    }

    type tvShowSearch {
      id: ID
      name: String
      overview: String
      poster_path: String
      vote_average: Float 
    }

    type gameSearch {
      id: ID
      name: String
      rating: Float
      background_image: String
    }

    type trailerVideo {
      videoId: String
      title: String
    }

    type Auth {
      token: ID!
      user: User
    }

    type Query {
      me: User
      users: [User]
      user(username: String!): User
      posts: [Post]
      movie(genre: Int!): [movieSearch]
      tvShow(genre: Int!): [tvShowSearch]
      game(genre: String!, platform: Int!): [gameSearch]
      trailer(mediaTitle: String!): trailerVideo
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        removeFriend(friendId: ID!): User
        addPost(postText: String!): Post
        saveMovie(movieId: ID!, movieName: String!, moviePoster: String, movieDetails: String!, movieRating: String): User
        saveTvShow(tvShowId: ID!, tvShowName: String!, tvShowPoster: String, tvShowDetails: String!, tvShowRating: String): User
        saveGame(gameId: ID!, gameName: String!, gamePoster: String, gameDetails: String, gameRating: String): User
    }
`;

module.exports = typeDefs;