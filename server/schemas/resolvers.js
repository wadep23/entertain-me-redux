// const axios = require('axios')
const fetch = require('node-fetch');
const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const movieKey = process.env.REACT_APP_MOVIE_TV_API_KEY;
const gameKey = process.env.REACT_APP_GAME_API_KEY;
const trailerKey = process.env.REACT_APP_TRAILER_API_KEY;

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')
                    .populate('favoriteMovies')
                    .populate('favoriteTvShows')
                    .populate('favoriteGames')
                    .populate('createdPosts')
                return userData    
            }

            throw new AuthenticationError('Not currently logged in')
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('favoriteMovies')
                .populate('favoriteTvShows')
                .populate('favoriteGames')
                .populate('createdPosts')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('favoriteMovies')
                .populate('favoriteTvShows')
                .populate('favoriteGames')
                .populate('createdPosts')
        },
        posts: async () => {
            return Post.find()
                .select('-__v')
        },
        movie: async (parent, { genre }) => {
            let randomPageNumber = Math.floor(Math.random() * 500);

            const url = ("https://api.themoviedb.org/3/discover/movie?api_key="
            + movieKey + "&language=en-US&page=" + randomPageNumber + 
            "&with_genres=" + genre);
            
            const response = await fetch(url)
            const data = await response.json();
            let movieDataReturn = [];

            // For loop to generate all results from the first page, 20
            for(let i = 0; i < data.results.length; i++) {
                movieDataReturn.push(data.results[i])
            }

            return movieDataReturn
        },
        tvShow: async (parent, { genre }) => {
            let randomPageNumber = Math.floor(Math.random() * 500);
            
            const url = ("https://api.themoviedb.org/3/discover/tv?api_key="
            + movieKey + "&language=en-US&page=" + randomPageNumber + 
            "&with_genres=" + genre);

            const response = await fetch(url);
            const data = await response.json();
            let tvDataReturn = [];

            // For loop to generate all results from the first page, 20
            for(let i = 0; i < data.results.length; i++) {
                tvDataReturn.push(data.results[i])
            };

            return tvDataReturn
        },
        game: async (parent, { genre, platform }) => {
            const url = ("https://api.rawg.io/api/games?key=" + gameKey
            + "&genres=" + genre + "&parent_platforms=" + platform);
            const response = await fetch(url);
            const data = await response.json();
            let gameDataReturn = [];

            // For loop to generate all results from the first page, 20
            for(let i = 0; i < data.results.length; i++) {
                gameDataReturn.push(data.results[i])
            };

            return gameDataReturn
        },
        trailer: async (parent, { mediaTitle }) => {
            const url = ("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="
            + (mediaTitle + "trailer") + "&key=" + trailerKey);
            const response = await fetch(url);
            const data = await response.json();
            const videoData = {
                videoId: data.items[0].id.videoId,
                title: data.items[0].snippet.title
            }

            return videoData
            // To access video, use <iframe> on front end with link `https://www.youtube.com/embed/${data.items[0].id.videoId}`
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
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, username: context.user.username })

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { createdPosts: post._id } },
                    { new: true }
                );

                return post
            }

            throw new AuthenticationError("You must be logged in!");
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
        removeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const deleteMovieArr = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { favoriteMovies: { movieId } } },
                    { new: true }
                )

                return deleteMovieArr
            }

            throw new AuthenticationError('You must be logged in to do this!')
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
        removeTvShow: async (parent, { tvShowId }, context) => {
            if (context.user) {
                const deleteShowArr = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { favoriteTvShows: { tvShowId } } },
                    { new: true }
                )

                return deleteShowArr
            }

            throw new AuthenticationError('You must be logged in to do this!')
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
        },
        removeGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const deleteGameArr = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { favoriteGames: { gameId } } },
                    { new: true }
                )

                return deleteGameArr
            }

            throw new AuthenticationError('You must be logged in to do this!')
        },
    }     
};

module.exports = resolvers;