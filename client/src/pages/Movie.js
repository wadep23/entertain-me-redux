import React from "react";
import { Redirect } from "react-router";
import auth from "../utils/auth";
import SearchMovies from "../components/Movie";
import { GiFilmProjector } from "react-icons/gi";

const Movie = () => {
  if (!auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            <GiFilmProjector /> Select a Movie genre:
          </h2>
          <SearchMovies />
        </div>
      </div>
    </main>
  );
};

export default Movie;
