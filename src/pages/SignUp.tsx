import React, {useContext, useState} from "react";
import {Button, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../App";
import {validateEmail, validatePassword, validateUsername} from "../helper";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {User} from "./auth";

export default function SignUp() {
    const auth = useContext(AuthContext)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const credentialsRaw = localStorage.getItem('credentials')
        const credentials = credentialsRaw ? JSON.parse(credentialsRaw) as User[] : undefined

        const usernameErrMsg = validateUsername(username, credentials)
        setUsernameErrorMessage(usernameErrMsg)
        const emailErrMsg = validateEmail(email, credentials)
        setEmailErrorMessage(emailErrMsg)
        const passwordErrMsg = validatePassword(password)
        setPasswordErrorMessage(passwordErrMsg)

        if (!usernameErrMsg && !emailErrMsg && !passwordErrMsg)
            auth.signUp(username, email, password)
    };

    return <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item  md={4}>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={submit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            name={'username'}
                            fullWidth
                            helperText={usernameErrorMessage}
                            error={usernameErrorMessage !== ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name={'email'}
                            fullWidth
                            helperText={emailErrorMessage}
                            error={emailErrorMessage !== ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            name={'password'}
                            fullWidth
                            helperText={passwordErrorMessage}
                            error={passwordErrorMessage !== ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item justifyContent={'center'} xs={12}>
                        <Button variant="contained" fullWidth color="primary" type="submit">
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
                <Typography>
                    Already have an account? <NavLink to={'/login'}>Log in</NavLink>
                </Typography>
            </form>
        </Grid>
    </Grid>
};