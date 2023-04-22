import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { NavLink } from "react-router-dom";

function NavigationBar({ setUser}){
    const linkStyles = {
        display: "inline",
        width: "0px",
        padding: "0px 30px 0px 50px",
        margin: "0px",
        color: "white",
        textAlign: "center"
       };

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return(
        <AppBar position='static'>
            <Toolbar>
                <IconButton size ="large" edge = 'start' color = 'inherit' aria-label = 'logo'>
                    <LibraryMusicIcon />
                </IconButton>
                <Typography variant = 'h6' component = 'div' sx={{flexGrow: 1}}>
                    MUSIC LIBRARY APP
                </Typography>
                <Typography textAlign ='justify' variant = 'contained'>
                    <NavLink to = "/" exact style = {linkStyles}>Home</NavLink>
                    <NavLink to = "/myplaylists" exact style = {linkStyles}>My Playlists</NavLink>
                    <NavLink to = "/songs" exact style = {linkStyles}>Songs</NavLink>
                </Typography>
                <Button  variant = 'contained'  onClick={handleLogoutClick}>Log Out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar