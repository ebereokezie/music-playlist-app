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

    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }


    useEffect(() => {
        fetch("/songs")
        .then((data) => {
            if (data.ok) {
                data.json()
                .then(data => setSongs(data))
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

    return(
        <>
            <TextField
                label="Search by Song, Artist, or Album"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
                inputProps={{
                    style: {
                      width: "500px",
                    },
                  }}
            />
            <Grid container spacing ={3}>
                {filteredSongs.map((song)=> (
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
                        </Card>
                    </Grid>
                ))}
            </Grid>       
        </>

    )
}

export default Songs;