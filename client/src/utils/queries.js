import { gql } from '@apollo/client';

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
        }
    }
`;