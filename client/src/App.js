import React, {useState, useEffect, useContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import { UserContext } from './Contexts/UserContext';
import Home from './Home'
import Login from './Login';
import Songs from './Songs'
import UserPlaylists from './UserPlaylists'
import './App.css';
import NavigationBar from './NavigationBar';
import PlaylistDetails from './PlaylistDetails'
import AddNewPlaylist from './AddNewPlaylist';
import { UserContextProvider } from './Contexts/UserContext';
import { PlaylistContextProvider } from './Contexts/PlaylistContext';

function App() {

  return (
    <UserContextProvider>
      <PlaylistContextProvider>
      <NavigationBar sx={{ backgroundColor: '#2196f3' }} />
      <Routes>
        <Route exact path="/home" element ={<Home  />} />
        <Route exact path="/myplaylists" element ={<UserPlaylists />} />
        <Route exact path="/songs" element ={<Songs  />} />
        <Route exact path="/myplaylists/:id" element = {<PlaylistDetails />} />
        <Route exact path="/myplaylists/add-new-playlist" element = {<AddNewPlaylist />} />
      
      </Routes>
      </PlaylistContextProvider>
    </UserContextProvider>
  );
}

export default App;
