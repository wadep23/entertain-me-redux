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

    type Auth {
      token: ID!
      user: User
    }

    type Query {
      me: User
      users: [User]
      user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        removeFriend(friendId: ID!): User
        saveMovie(movieId: ID!, movieName: String!, moviePoster: String, movieDetails: String!, movieRating: String): User
        saveTvShow(tvShowId: ID!, tvShowName: String!, tvShowPoster: String, tvShowDetails: String!, tvShowRating: String): User
    }
`;

module.exports = typeDefs;