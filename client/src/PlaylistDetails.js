import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'


function PlaylistDetails() {
    const [playlistSongs, setPlaylistSongs] = useState({title: "", songs: []})
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams()
 
    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }


    useEffect(() => {
        fetch(`/playlists/${id}`)
        .then((data) => {
            if (data.ok) {
                setIsLoading(false);
                data.json()
                .then(data => setPlaylistSongs(data))
            } else {
                data.json()
                .then((err) => console.log(err.errors))
            }
    })
}, [])

function handleDeleteClick(song){
   
        fetch(`/playlists/${id}/playlist_songs/${song.id}`, {
            method: "DELETE"
        }).then((data)=> {
            if (data.ok) {
                const updatedSongs = playlistSongs.songs.filter(playlistSong => playlistSong.id !== song.id);
           
                const updatedPlaylist = {
                ...playlistSongs,
                songs: updatedSongs
            };
            setPlaylistSongs(updatedPlaylist);
            }
            else {
                data.json()
                .then((err) => console.log(err.errors))
            }
        })
    }





    const filteredPlaylistSongs = playlistSongs.songs.filter((playlistSong) =>
    playlistSong.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlistSong.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlistSong.album.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const allPlaylistSongs = filteredPlaylistSongs.map((playlistSong)=> (
        <Grid item key={playlistSong.id} xs={12} sm={6} md={4}>
            <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image= "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant ="h5" component="h2">
                            {playlistSong.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {playlistSong.artist}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {playlistSong.album}
                        </Typography>
                    </CardContent>
                    <Button onClick ={() => handleDeleteClick(playlistSong)}>
                        <DeleteIcon />
                    </Button>
            </Card>
        </Grid>
    ))

    const displayPlaylistSongs = filteredPlaylistSongs.length !== 0 ? <Grid container spacing ={3}> {allPlaylistSongs} </Grid> : <Typography >{"We don't have that song...yet!"}</Typography>
    return(
        <>
            <TextField
                placeholder="Search by Song, Artist, or Album"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
                inputProps={{
                    style: {
                      width: "500px",
                    },
                  }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
                {playlistSongs.title}
            </Typography>
            <>
            {isLoading ? <div>{"Loading..."}</div> : displayPlaylistSongs}
            </>
            
        </>

    )
}

export default PlaylistDetails;