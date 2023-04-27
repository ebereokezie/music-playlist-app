import { TextField, Button } from '@material-ui/core';
import React, {useState, useEffect} from 'react';

function EditPlaylist({playlist, handleUpdatedPlaylist}){

    const [playlistTitle, setPlaylistTitle] = useState(playlist.title)
    const [errors, setErrors] = useState([]);
    const [visible, setVisible] = useState(false)

    function handlePlaylistEdit(e){
        e.preventDefault()

        fetch(`/playlists/${playlist.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: playlistTitle
            }),
        })
        .then((data) => {
            if (data.ok) {
                data.json()
                .then(
                    (data) => handleUpdatedPlaylist(data))
            } else {
                data.json().then((err) => setErrors(err.errors))
            }
        })
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


    return(
        <form onSubmit ={handlePlaylistEdit}>
            <TextField 
                    margin = 'normal' 
                    type = {'text'} 
                    variant = "outlined" 
                    placeholder='Edit Playlist Name' 
                    value={playlistTitle}
                    onChange={(e) => setPlaylistTitle(e.target.value)}/>
              <Button 
                    sx = {{marginTop: 3, borderRadius: 3}} 
                    variant = 'contained' 
                    color = "warning" 
                    type="submit"
                 >
                    Save
                </Button>
        </form>
    )
}

export default EditPlaylist