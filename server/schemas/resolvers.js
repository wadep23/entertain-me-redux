import axios from 'axios';
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const movieKey = process.env.REACT_APP_MOVIE_TV_API_KEY;
const gameKey = process.env.REACT_APP_GAME_API_KEY;

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')

                return userData    
            }

            throw new AuthenticationError('Not currently logged in')
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
        },
        movieSearch: async () => {
            const BASE_URL = "https://api.themoviedb.org/3";
            const api = axios.create({ baseURL: BASE_URL })

            const getUpcoming = api.get("movie/upcoming", {
                params: { movieKey }
            });

            return getUpcoming
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.correctPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updateUserFriends = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true } 
                ).populate('friends');

                return updateUserFriends
            }

            throw new AuthenticationError('You must be logged in to add a friend!');
        },
        removeFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                console.log(friendId)
                const deleteFriend = await User.findByIdAndUpdate(
                    { _id: context.user._id,  },
                    { $pull: { friends: friendId } },
                    { new: true }
                )
                console.log(deleteFriend)
                return deleteFriend
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        saveMovie: async (parent, { movieId, movieName, moviePoster, movieDetails, movieRating }, context) => {
            if (context.user) {
                const addFavMovie = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { favoriteMovies: { movieId, movieName, moviePoster, movieDetails, movieRating } } },
                    { new: true }
                )

                return addFavMovie
            }

            throw new AuthenticationError('You must be logged in to save a favorite movie!')
        },
        saveTvShow: async (parent, { tvShowId, tvShowName, tvShowPoster, tvShowDetails, tvShowRating }, context) => {
            if (context.user) {
                const addFavTvShow = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { favoriteTvShows: { tvShowId, tvShowName, tvShowPoster, tvShowDetails, tvShowRating } } },
                    { new: true }
                )

                return addFavTvShow
            }

            throw new AuthenticationError('You must be logged in to save a favorite tv show!')
        },
        saveGame: async (parent, { gameId, gameName, gamePoster, gameRating}, context)  => {
            if (context.user) {
                const addFavGame = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {$addToSet: { favoriteGames: { gameId, gameName, gamePoster, gameRating } } },
                    { new: true }
                )

                return addFavGame
            }

            throw new AuthenticationError('You must be logged in to save a favorite game!')
        }
    }     
};

module.exports = resolvers;