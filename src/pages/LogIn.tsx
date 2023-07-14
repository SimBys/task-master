import React, {useState} from 'react';
import { TextField, Button, Grid, Typography, useColorScheme,} from '@mui/material';
import {NavLink} from "react-router-dom";


export default function LogIn() {
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');


	return <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
		<Grid item  md={4}>
			<Typography variant="h4" align="center" gutterBottom>
				Login
			</Typography>
			<form>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Email"
							fullWidth
							value={mail}
							onChange={(e: any) => setMail(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Password"
							type="password"
							fullWidth
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
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
