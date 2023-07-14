import styles from "./SignUp.module.css";
import {useState} from "react";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Perform sign-up logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
    };

    return <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item  md={4}>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
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