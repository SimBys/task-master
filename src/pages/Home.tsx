import React from 'react';
import {Button, Grid, Paper, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {

	return (
		<div className={styles.container}>
			<Paper sx={{ zIndex: 1, p: 4, borderRadius: 5 }}>
				<Grid container alignItems="center" justifyContent="center" spacing={2}>
					<Grid item>
						<Typography variant="h3">Welcome to</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h3" fontWeight={700}>
							Task master
						</Typography>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justifyContent="center" mt={2}>
					<Grid item>
						<Typography variant="h5">The ultimate todo list</Typography>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justifyContent="center" mt={2}>
					<Grid item>
						<Link to="/login" className={styles.link}>
							<Button variant="contained" color="primary" className={styles.button}>
								Log In
							</Button>
						</Link>
					</Grid>
					<Grid item ml={3}>
						<Link to="/sign-up" className={styles.link}>
							<Button variant="contained" color="secondary" className={styles.button}>
								Sign Up
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};
