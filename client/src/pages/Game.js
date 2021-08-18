import React from 'react';
import { Redirect } from 'react-router';
import auth from '../utils/auth';
import SearchMedia from '../components/Game'

const Game = () => {
  if (!auth.loggedIn()) {
    return <Redirect to ="/" />
  }
  
  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block">
            So, you need a game to play? Select your platform and click on a genre below to watch the magic happen!
          </h2>
          <SearchMedia />
        </div>
      </div>
    </main> 
)};

export default Game;