import React, {useState, useContext} from 'react';
import { UserContext } from './Contexts/UserContext';
import {  Button, Box} from "@mui/material"
import LogInForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

function Login({onLogin}){
   
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
        {showLogin ? (
            <>
            <LogInForm onLogin ={onLogin} />
                <Box textAlign = 'center'>
                    <Button 
                   
                    sx = {{marginTop: 3, borderRadius: 3, textAlign: 'justify'}}onClick= {() => setShowLogin(false)}>
                    Sign Up
                    </Button>
                </Box>
            </>

        ) : (
            <>
            <SignUpForm onLogin = {onLogin} />
                <Box textAlign = 'center'>
                
                    <Button sx = {{marginTop: 3, borderRadius: 3}} onClick= {() => setShowLogin(true)}>
                    Log In
                    </Button>
                </Box>
            </>
        )}
        </div>
    )
}

export default Login