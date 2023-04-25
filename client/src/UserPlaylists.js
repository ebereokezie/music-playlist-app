import React, { useState, useEffect} from 'react'
import {Link} from "react-router-dom"
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


function UserPlaylists() {
    const [playlists, setPlaylists] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }


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

    const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    )

    const myPlaylists = filteredPlaylists.map((playlist)=> (
        <Grid item key={playlist.id} xs={12} sm={6} md={4}>
            <Card>
                <CardActionArea component ={Link} to={`/myplaylists/${playlist.id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image= "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant ="h5" component="h2">
                            {playlist.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    ))

    const displayPlaylists = filteredPlaylists.length !== 0 ? <Grid container spacing ={3}> {myPlaylists} </Grid> : <Typography >{"Dude, where's my playlist?"}</Typography>
    return(
        <>
            <TextField
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
                inputProps={{
                    style: {
                      width: "500px"
                    },
                  }}
            />
            
               {isLoading ? <div>{"Loading..."}</div> : displayPlaylists}
                  
        </>

    )
}

export default UserPlaylists;