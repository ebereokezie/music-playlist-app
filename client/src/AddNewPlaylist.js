import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { PlaylistContext } from './Contexts/PlaylistContext';
import { Box, Button, TextField, Typography } from "@mui/material"

function AddNewPlaylist() {
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistImage, setNewPlaylistImage] = useState(null)
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false)
  const {playlists, setPlaylists} = useContext(PlaylistContext)
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    if (!newPlaylistImage) {
        setErrors(["Please choose an image for your playlist cover."]);
        return;
      }

    const formData = new FormData();
    formData.append("title", newPlaylistTitle);
    formData.append("image", newPlaylistImage);
    fetch("/playlists", {
      method: "POST",
      body: formData,
    }).then((data) => {
      if (data.ok) {
        data.json().then((data) =>
        {
        setPlaylists([...playlists, data]);
        setNewPlaylistTitle("");
        setNewPlaylistImage(null);
        navigate("/myplaylists")}
        );
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
                        <h4>Choose an Image as your playlist cover</h4>
                    <input type="file" onChange={(e) => setNewPlaylistImage(e.target.files[0])} />
                            
                    
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