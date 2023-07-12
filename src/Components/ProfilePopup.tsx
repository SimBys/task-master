import styles from "./ProfilePopup.module.css";
import {useState} from "react";

type Props = {
	closeCB: Function
}

export default function ProfilePopup(props: Props) {



	return (
		<div className={styles.plane} onClick={() => props.closeCB()}>
			<div style={{top: 57}} className={styles.container} onClick={e => e.stopPropagation()}>
				<h3>Hello, Simon!</h3>

				<button onClick={() => props.closeCB()}>Log out</button>

			</div>
		</div>
	)
}