import React from 'react';
import { Redirect } from 'react-router';
import auth from '../utils/auth';
import SearchShows from '../components/TV'
import { GiTvRemote } from "react-icons/gi";



const Tv = () => {
  if (!auth.loggedIn()) {
    return <Redirect to ="/" />
  }
  
  return (
    <main>
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
            <GiTvRemote /> Select a TV genre: 
          </h2>
          <SearchShows />
        </div>
      </div>
    </main> 
)
};

export default Tv;
