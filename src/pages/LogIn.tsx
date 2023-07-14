import React, {useContext, useState} from 'react';
import {Button, Grid, TextField, Typography,} from '@mui/material';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../App";


export default function LogIn() {
	const auth = useContext(AuthContext)
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


	function checkEmail(email: string) {
		if (email.length === 0) {
			setEmailErrorMessage('Email address is required')
			return
		}

		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		if (!emailRegex.test(email)) {
			setEmailErrorMessage('Invalid email address')
			return;
		}

		setEmailErrorMessage('')
	}

	function submit(e: any) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		checkEmail(email)

		// check password

		auth.logIn(email, password)
	}


	return <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
		<Grid item  md={4}>
			<Typography variant="h4" align="center" gutterBottom>
				Login
			</Typography>
			<form onSubmit={submit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Email"
							name={'email'}
							fullWidth
							required
							helperText={emailErrorMessage}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Password"
							name={'password'}
							type="password"
							fullWidth
							required
							helperText={passwordErrorMessage}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" fullWidth type="submit">
							Login
						</Button>
					</Grid>
					<Grid item>
						<Typography>
							Don't have an account? <NavLink to={'/sign-up'}>Sign up</NavLink>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</Grid>
	</Grid>
};
