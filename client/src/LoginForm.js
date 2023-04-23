import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((data) => {
      setIsLoading(false);
      if (data.ok) {
        data.json().then((user) => onLogin(user));
      } else {
        data.json().then((err) => setErrors(err.errors));
      }
    });
  }

  

    useEffect(() => {
        if(!errors){
            setVisible(false)
            return
        }

        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [errors])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                    display = "flex" 
                    flexDirection={"column"} 
                    maxWidth={400} 
                    alignItems ="center" 
                    justifyContent={"center"}
                    margin = "auto"
                    marginTop = {5}
                    padding ={3}
                    borderRadius = {5}
                    boxShadow = { '5px 5px 10px #ccc'}
                    sx ={{
                        ":hover": {
                            boxShadow: '10px 10px 20px #ccc'
                        }}}
                    
                    >
                    <Typography variant ="h2" padding ={3} textAlign = "center">Login</Typography>
                    <TextField 
                        margin = 'normal' 
                        type = {'text'} 
                        variant = "outlined" 
                        placeholder='Username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    <TextField 
                        margin = 'normal' 
                        type = {'password'} 
                        variant = "outlined" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <Button 
                        sx = {{marginTop: 3, borderRadius: 3}} 
                        variant = 'contained' 
                        color = "warning" 
                        type="submit"
                    >
                            {isLoading ? "Loading..." : "Login"}
                    </Button>
                    <div>
                         {visible ? (errors.map((err) => (
                            <ul key={err}>{err}</ul>
                         ))) : (<> </>)}
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default LoginForm;