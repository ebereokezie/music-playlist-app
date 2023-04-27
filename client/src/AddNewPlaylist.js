import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"

function AddNewPlaylist() {
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    fetch("/playlists")
    .then((data) => {
        if (data.ok) {
            data.json()
            .then(data => setPlaylists(data))
        } else {
            data.json()
            .then((err) => console.log(err.errors))
        }
})
}, [])

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newPlaylistTitle }),
    }).then((data) => {
      if (data.ok) {
        data.json().then((data) => setPlaylists([...playlists, data]));
      } else {
        data.json().then((err) => setErrors(err.errors));
      }
    });
  }

  

    useEffect(() => {
        if(!errors){
            setVisible(false)
            return
        }

        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                    display = "flex" 
                    flexDirection={"column"} 
                    maxWidth={400} 
                    alignItems ="center" 
                    justifyContent={"center"}
                    margin = "auto"
                    marginTop = {5}
                    padding ={3}
                    borderRadius = {5}
                    boxShadow = { '5px 5px 10px #ccc'}
                    sx ={{
                        ":hover": {
                            boxShadow: '10px 10px 20px #ccc'
                        }}}
                    
                    >
                    <Typography variant ="h3" padding ={3} textAlign = "center">Make a new playlist!</Typography>
                    <TextField 
                        margin = 'normal' 
                        type = {'text'} 
                        variant = "outlined" 
                        placeholder='title' 
                        value={newPlaylistTitle}
                        onChange={(e) => setNewPlaylistTitle(e.target.value)}/>
                    <Button 
                        sx = {{marginTop: 3, borderRadius: 3}} 
                        variant = 'contained' 
                        color = "warning" 
                        type="submit"
                    >
                        Submit
                    </Button>
                    <div>
                         {visible ? (errors.map((err) => (
                            <ul key={err}>{err}</ul>
                         ))) : (<> </>)}
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default AddNewPlaylist;