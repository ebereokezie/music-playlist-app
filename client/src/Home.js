import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4),
    },
    title: {
        color: 'Blue',
        marginBottom: theme.spacing(4),
        fontWeight: 'bold',
        textShadow: '1px 1px #000'
    },
    image: {
        width: '100%',
        maxwidth: 500
    }
}))

function Home(){
    const classes = useStyles()

    return(
        <div className = {classes.root}>
            <Grid container spacing = {4} alignItems ='center' justify ="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h1" className ={classes.title}>
                        Music Library Application
                    </Typography>
                    <Typography variant = "h5">
                        Create your own unique, fun, music playlist just for you!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}> 
                    <img src = "https://media.istockphoto.com/id/958364166/photo/girl-in-headphones-listening-to-music-in-the-city-at-sunset.jpg?s=612x612&w=0&k=20&c=zj7pvuKlXPdPSoNtcLJuqLPJSey4c3yoKAHGnrqWhLY=" className = {classes.image} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;