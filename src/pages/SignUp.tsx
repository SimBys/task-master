import {useContext, useState} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../App";

export default function SignUp() {
    const auth = useContext(AuthContext)

    const submit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

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
                            label="Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
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