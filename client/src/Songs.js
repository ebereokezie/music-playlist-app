import React, { useState, useEffect, useContext} from 'react'
import { PlaylistContext } from './Contexts/PlaylistContext';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core'


function Songs() {
    const {playlists, setPlaylists, isLoading, setIsLoading} = useContext(PlaylistContext)
    const [songs, setSongs] = useState([])
    const [message, setMessage] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [playlistIds, setPlaylistIds] = useState([]);
    const [messageIndex, setMessageIndex] = useState(null);
    const [visible, setVisible] = useState(false)
   

    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }


    useEffect(() => {
        if(!message){
            setVisible(false)
            return
        }

        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [message])




    useEffect(() => {
        fetch("/songs")
        .then((data) => {
            if (data.ok) {
                setIsLoading(false);
                data.json()
                .then(data => setSongs(data))
            } else {
                data.json()
                .then((err) => console.log(err.errors))
            }
    })
}, [])

useEffect(() => {
    fetch("/playlists")
    .then((data) => {
        if (data.ok) {
            setIsLoading(false);
            data.json()
            .then(data => setPlaylists(data))
        } else {
            data.json()
            .then((err) => console.log(err.errors))
        }
})
}, [])

    const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handlePlaylistSelect(e, index){
        const newPlaylistIds = {...playlistIds}

        newPlaylistIds[index] = e.target.value;
        setPlaylistIds(newPlaylistIds);
};
    

    function handleAddToPlaylist(song, index){
        if (playlistIds[index]){
            fetch(`/playlists/${playlistIds[index]}/playlist_songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    song_id: song.id,
                    playlist_id: playlistIds[index]
                })
                
            })
            .then((data) => {
                if (data.ok) {
                    data.json()
                    .then((data) => {
                        console.log(song.id)
                        setPlaylists((prevPlaylists) => {
                            const updatedPlaylists = prevPlaylists.map((playlist) => {
                              if (playlist.id === playlistIds[index]) {
                                return {
                                  ...playlist,
                                  playlist_songs: [...playlist.playlist_songs, data],
                                };
                              }
                              return playlist;
                            });
                            return updatedPlaylists;
                            
                          });
                          setMessage(["Song has been added"])
                          setMessageIndex(song.id)
                        });
                }
                else {
                    data.json()
                    .then((err) =>{
                        setMessage(err.errors)
                        setMessageIndex(song.id)
                
            }
            )
            }
    })}}

    console.log(messageIndex)

const confirmationMessage =  visible ? (message.map((mes) => (
        <ul key={mes}>{mes}</ul>
     ))) : (<> </>)


    const allSongs = filteredSongs.map((song, index)=> (
        <Grid item key={song.id} xs={12} sm={6} md={4}>
            <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image= "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant ="h5" component="h2">
                            {song.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {song.artist}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {song.album}
                        </Typography>
                    </CardContent>
                    <select value = {playlistIds[index]} onChange = {handlePlaylistSelect}>
                        <option>Select a Playlist</option>
                        {playlists.map((playlist) => (
                        <option value={playlist.id} key={playlist.id}>
                         {playlist.title}
                         </option>
                        ))}
                    </select>
                    <Button  sx = {{marginTop: 3, borderRadius: 3}} onClick = {() => handleAddToPlaylist(song, playlistIds[index])} variant = 'contained' color = "secondary">Add to Playlist</Button>
                    {song.id === messageIndex ? <Typography> {confirmationMessage} </Typography> : (<></>) }

            </Card>
        </Grid>
    ))

    
    
    const displaySongs = filteredSongs.length !== 0 ? <Grid container spacing ={3}> {allSongs} </Grid> : <Typography >{"We don't have that song...yet!"}</Typography>
   
    

  
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
            <Typography variant ="h4" padding ={3} textAlign = "center">Song Library</Typography>
            <Typography variant ="h6" padding ={3} textAlign = "center">Instructions: Using the dropdown, add the songs to your own unique playlists!</Typography>
            <>
            <Typography variant = "h6">
            
            </Typography>
            {isLoading ? <div>{"Loading..."}</div> : displaySongs}
            
            </>
            
        </>

    )
}

export default Songs;