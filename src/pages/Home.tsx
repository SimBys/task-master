import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>Welcome to My Landing Page</h1>
				<p>Explore the amazing features and sign up now!</p>
				<div className={styles.buttonContainer}>
					<Link to="/login" className={styles.link}>
						<Button variant="contained" color="primary" className={styles.button}>
							Log In
						</Button>
					</Link>
					<Link to="/sign-up" className={styles.link}>
						<Button variant="contained" color="secondary" className={styles.button}>
							Sign Up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
