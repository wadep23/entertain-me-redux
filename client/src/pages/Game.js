import React from 'react';
import { Redirect } from 'react-router';
import auth from '../utils/auth';
import SearchMedia from '../components/Game'
import { IoGameController } from "react-icons/io5";

const Game = () => {
  if (!auth.loggedIn()) {
    return <Redirect to ="/" />
  }
  
  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            <IoGameController /> Select Platform & Game genre:
          </h2>
          <SearchMedia />
        </div>
      </div>
    </main>
  )};

export default Game;