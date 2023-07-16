import styles from "./ProfilePopup.module.css";
import {useContext, useState} from "react";
import {AuthContext} from "../App";

type Props = {
	closeCB: Function
}

export default function ProfilePopup(props: Props) {
	const auth = useContext(AuthContext);

	function logOut() {
		props.closeCB()
		auth.signOut()
	}

	return (
		<div className={styles.plane} onClick={() => props.closeCB()}>
			<div style={{top: 57}} className={styles.container} onClick={e => e.stopPropagation()}>
				<h3>Hello, {auth.user!.username}!</h3>

				<button onClick={logOut}>Log out</button>

			</div>
		</div>
	)
}