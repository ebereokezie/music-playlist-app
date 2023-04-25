import React, {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Songs from './Songs'
import UserPlaylists from './UserPlaylists'
import './App.css';
import NavigationBar from './NavigationBar';
import PlaylistDetails from './PlaylistDetails'

function App() {
  const [user, setUser] = useState('');
  

  useEffect(() => {
    
    fetch("/me").then((data) => {
      if (data.ok) {
        data.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <NavigationBar sx={{ backgroundColor: '#2196f3' }} setUser = {setUser}/>
      <Routes>
      <Route exact path="/" element ={<Home  />} />
      <Route exact path="/myplaylists" element ={<UserPlaylists />} />
      <Route exact path="/songs" element ={<Songs  />} />
      <Route exact path="/myplaylists/:id" element = {<PlaylistDetails />} />
   </Routes>
    </div>
  );
}

export default App;
