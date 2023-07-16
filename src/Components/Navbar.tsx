import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";
import {createRef, useContext, useEffect, useRef, useState} from "react";
import ProfilePopup from "./ProfilePopup";
import {AuthContext} from "../App";

export default function Navbar() {
    const [profilePopupOpen, setProfilePopupOpen] = useState(false);
    const auth = useContext(AuthContext);

    function selectTab(e: any) {
        underlineRef.current!.style.left = e.target.getBoundingClientRect().left + "px";
        underlineRef.current!.style.width = e.target.getBoundingClientRect().width + "px";
    }

    const homeRef = createRef<HTMLAnchorElement>()
    const underlineRef = createRef<HTMLDivElement>()


    useEffect(() => {
        underlineRef.current!.style.width = homeRef.current!.getBoundingClientRect().width + "px";
        underlineRef.current!.style.left = homeRef.current!.getBoundingClientRect().left + "px";
    }, [])



    return (
        <nav className={styles.navbar}>
            <NavLink ref={homeRef} onClick={selectTab} className={({ isActive}) => isActive ? styles.active : ""} to="">Task master</NavLink>
            <NavLink onClick={selectTab} className={({ isActive}) => isActive ? styles.active : ""} to="about">About</NavLink>
            <div className={styles.profile} onClick={() => setProfilePopupOpen(true)}>{auth.user!.username[0]}</div>
            {profilePopupOpen && <ProfilePopup closeCB={() => setProfilePopupOpen(false)} />}

            <div ref={underlineRef} className={styles.underline}></div>
        </nav>
    );
}