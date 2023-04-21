import React, {useState, useEffect} from 'react'
// import Home from './Home'
import Login from './Login';
// import Signup from './Signup'
// import Songs from './Songs'

// import PlaylistSong from './PlaylistSong'
// import UserPlaylists from './UserPlaylists'
// import {Route, Switch} from 'react-router-dom'
import './App.css';

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
      <Login />
    </div>
  );
}

export default App;
