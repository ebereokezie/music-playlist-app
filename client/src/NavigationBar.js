import React, { useContext } from 'react'
import { UserContext } from './Contexts/UserContext';
import {AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {Link} from "react-router-dom"
import { NavLink } from "react-router-dom";


function NavigationBar(){

const {setUser} = useContext(UserContext)

    const linkStyles = {
        display: "inline",
        width: "0px",
        padding: "0px 30px 0px 50px",
        margin: "0px",
        color: "white",
        textAlign: "center"
       };

       const navBarStyles = {
        backgroundColor: "blue",
        button: {
            color: 'orange',
          }
      };

    
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            localStorage.clear()
            setUser(null);
          }
        });
      }
    return(
        <AppBar position='static' style={navBarStyles}>
            <Toolbar>
                <IconButton size ="large" edge = 'start' color = 'inherit' aria-label = 'logo'>
                    <LibraryMusicIcon />
                </IconButton>
                <Typography variant = 'h6' component = 'div' sx={{flexGrow: 1}} color ="white">
                    MUSIC LIBRARY APP
                </Typography>
                <Typography textAlign ='justify' variant = 'contained'>
                    <NavLink to = "/home" exact style = {linkStyles}>Home</NavLink>
                    <NavLink to = "/myplaylists" exact style = {linkStyles}>My Playlists</NavLink>
                    <NavLink to = "/songs" exact style = {linkStyles}>Songs</NavLink>
                </Typography>
                <Button component={Link} to="/login" variant = 'contained' style={{color: "white"}} onClick={handleLogoutClick} >Log Out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar