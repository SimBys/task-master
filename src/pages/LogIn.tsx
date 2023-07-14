import React, {useContext, useState} from 'react';
import {Button, Grid, IconButton, InputAdornment, TextField, Typography,} from '@mui/material';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../App";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {validatePassword, validateEmail} from "../helper";


export default function LogIn() {
	const auth = useContext(AuthContext)
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);


	function submit(e: any) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		setEmailErrorMessage(validateEmail(email))
		setPasswordErrorMessage(validatePassword(password))

		auth.logIn(email, password)
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
