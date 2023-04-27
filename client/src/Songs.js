import React, { useState, useEffect} from 'react'
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
    const [songs, setSongs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [playlists, setPlaylists] = useState([])
    const [playlistIds, setPlaylistIds] = useState([]);

    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }


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
        //setPlaylistId(e.target.value)
    //}

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
                    .then((data) => setPlaylists([...playlists, data]))
                }
                else {
                    data.json()
                    .then((err)=> console.log(err.errors))
                }
            }
            )
        }
    }

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
                                <option value ={playlist.id}>
                                    {playlist.title}
                                </option>
                            ))}
                    </select>
                    <Button  sx = {{marginTop: 3, borderRadius: 3}} onClick = {() => handleAddToPlaylist(song, playlistIds[index])} variant = 'contained' color = "secondary">Add to Playlist</Button>
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
            <>
            {isLoading ? <div>{"Loading..."}</div> : displaySongs}
            </>
            
        </>

    )
}

export default Songs;