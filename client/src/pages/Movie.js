import React from 'react';
import Auth from '../utils/auth';
import SearchMedia from '../components/Movie'
import { GiFilmProjector} from "react-icons/gi";

const Movie = () => {
  if (!auth.loggedIn()) {
    return <Redirect to ="/" />
  }
  
  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            <GiFilmProjector /> Choose a movie genre: 
          </h2>
          <SearchMedia />
        </div>
      </div>
    </main> 
)};

export default Movie;
