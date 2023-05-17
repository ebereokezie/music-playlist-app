import React, { useState, useContext} from 'react'
import { PlaylistContext } from './Contexts/PlaylistContext';
import { UserContext } from './Contexts/UserContext';
import {Link} from "react-router-dom"
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography,
    Button,
    makeStyles
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditPlaylist from './EditPlaylist';
import AddNewPlaylist from './AddNewPlaylist'


const useStyles = makeStyles((theme) => ({
    addPlaylistButton: {
      position: 'absolute',
      top: theme.spacing(10),
      right: theme.spacing(2),
    },
  }));

function UserPlaylists() {
    const {playlists, setPlaylists } = useContext(PlaylistContext)
    const {isLoading} = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [editPlaylist, setEditPlaylist] = useState(false)
    const [playlistId, setPlaylistId] = useState([]);

    const classes = useStyles();

    console.log(playlists)
    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    function handlePlaylistSelect(playlist){
        setPlaylistId(playlist)
        setEditPlaylist(!editPlaylist)
};



function handleDeleteClick(deletedPlaylist){
   
    fetch(`/playlists/${deletedPlaylist.id}`, {
        method: "DELETE"
    }).then((data)=> {
        if (data.ok) {
            const updatedPlaylists = playlists.filter(playlist => playlist.id !== deletedPlaylist.id);
            setPlaylists(updatedPlaylists);
        }
        else {
            data.json()
            .then((err) => console.log(err.errors))
        }
    })
}

function handleUpdatedPlaylist(updatePlaylist) {
    setEditPlaylist(false);
    const updatedPlaylist = playlists.map((playlist) => {
        if(playlist.id === updatePlaylist.id) {
          return updatePlaylist
        } else {
          return playlist
        }
      });
      setPlaylists(updatedPlaylist)
  }
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
                        image= {playlist.image_url}
                    />
                </CardActionArea>
                    <CardContent>
                        {editPlaylist && playlistId.id === playlist.id ? (<EditPlaylist playlist = {playlist} handleUpdatedPlaylist = {handleUpdatedPlaylist} />) : (
                        <CardActionArea component ={Link} to={`/myplaylists/${playlist.id}`}>
                            <Typography gutterBottom variant ="h5" component="h2">
                                 {playlist.title}
                             </Typography>
                        </CardActionArea>)}
                    </CardContent>
               
                <Button onClick={()=> handleDeleteClick(playlist)}>
                    <DeleteIcon />
                </Button>
                <Button onClick ={() => handlePlaylistSelect(playlist)}>
                    <EditIcon />
                </Button>
            </Card>
        </Grid>
    ))

    const displayPlaylists = filteredPlaylists.length !== 0 ? <Grid container spacing ={3}> {myPlaylists} </Grid> : <Typography >{"Dude, where's my playlist?"}</Typography>
    return(
        <>
         <Button 
            component={Link} 
            to="/myplaylists/add-new-playlist" 
            variant="contained" 
             color="primary" 
             className={classes.addPlaylistButton}
            >
                Add New Playlist
            </Button>
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
            <Typography variant ="h4" padding ={3} textAlign = "center">My Playlists</Typography>
            <Typography variant ="h6" padding ={3} textAlign = "center">Instructions: Click on the playlists to see what songs you've added!</Typography>
               {isLoading ? <div>{"Loading..."}</div> : displayPlaylists}
                  
        </>

    )
}

export default UserPlaylists;