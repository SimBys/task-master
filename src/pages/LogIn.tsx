import React, {useContext, useState} from 'react';
import {Button, Grid, IconButton, InputAdornment, TextField, Typography,} from '@mui/material';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../App";
import {Visibility, VisibilityOff} from '@mui/icons-material';


export default function LogIn() {
	const auth = useContext(AuthContext)
	const [showPassword, setShowPassword] = useState(false);
	const [showIncorrectCredentialsError, setShowIncorrectCredentialsError] = useState(false);


	if (auth.user) {
		window.location.href = '/'
		return <></>
	}

	function submit(e: any) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const usernameOrEmail = formData.get("name") as string;
		const password = formData.get("password") as string;

		if (!auth.logIn(usernameOrEmail, password))
			setShowIncorrectCredentialsError(true)
	}


	return <Grid container spacing={2} justifyContent="center" alignItems="center" style={{height: '100vh'}}>
		<Grid item md={4}>
			<Typography variant="h4" align="center" gutterBottom>
				Login
			</Typography>
			<form onSubmit={submit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Username or Email"
							name={'name'}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type={showPassword ? 'text' : 'password'}
							label="Password"
							name={'password'}
							fullWidth
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
					{showIncorrectCredentialsError && (
						<Grid item xs={12}>
							<Typography color="error">
								The username, email or password is incorrect.
							</Typography>
						</Grid>
					)}
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
