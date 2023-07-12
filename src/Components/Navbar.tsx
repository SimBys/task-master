import './Navbar.module.css'
import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {

    return (
        <nav className={styles.navbar}>
            <NavLink className={({ isActive}) => isActive ? styles.active : ""} to="">Task master</NavLink>
            <NavLink className={({ isActive}) => isActive ? styles.active : ""} to="about">About</NavLink>
            <div>Profile</div>
        </nav>
    );
}