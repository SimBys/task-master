import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import {Box, Fade, Popper, IconButton, Paper, Typography, Button, Grid} from "@mui/material";
import styles from "./Navbar.module.css";

export default function ProfilePopup() {
	const auth = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	useEffect(() => {
		const handleClose = (event: MouseEvent) => {
			if (anchorEl?.contains(event.target as Node)) {
				return;
			}
			setOpen(false);
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("mouseup", handleClose);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mouseup", handleClose);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [anchorEl]);

	function logOut() {
		setOpen(false);
		auth.signOut();
	}

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? "transition-popper" : undefined;

	return (
		<div>
			<IconButton
				sx={{ right: '6px', position: "absolute", border: 1, height: 1, width: '55.5px' }}
				aria-describedby={id}
				className={styles.profile}
				onClick={handleClick}
			>
				{auth.user!.username[0].toUpperCase()}
			</IconButton>
			<Popper id={id} open={open} anchorEl={anchorEl} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={150}>
						<Paper sx={{ p: 2, border: 1 }} elevation={3}>
							<Typography variant={'h5'}>
								Hello, {auth.user!.username}!
							</Typography>
							<Grid container justifyContent="center" marginTop={4}>
								<Grid item>
									<Button variant={'contained'} onClick={logOut}>Log out</Button>
								</Grid>
							</Grid>
						</Paper>
					</Fade>
				)}
			</Popper>
		</div>
	);
}
