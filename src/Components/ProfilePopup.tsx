import React, {useContext} from "react";
import {AuthContext} from "../App";
import {Box, Fade, Popper} from "@mui/material";

type Props = {
	closeCB: Function
}

export default function ProfilePopup(props: Props) {
	const auth = useContext(AuthContext);

	function logOut() {
		props.closeCB()
		auth.signOut()
	}


	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? 'transition-popper' : undefined;

	return (
		<div>
			<button aria-describedby={id} type="button" onClick={handleClick}>
				Toggle Popper
			</button>
			<Popper id={id} open={open} anchorEl={anchorEl} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
							The content of the Popper.
						</Box>
					</Fade>
				)}
			</Popper>
		</div>

		// <div className={styles.plane} onClick={() => props.closeCB()}>
		// 	<div style={{top: 57}} className={styles.container} onClick={e => e.stopPropagation()}>
		// 		<h3>Hello, {auth.user!.username}!</h3>
		//
		// 		<button onClick={logOut}>Log out</button>
		//
		// 	</div>
		// </div>
	)
}