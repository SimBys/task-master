import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";
import {createRef, useEffect} from "react";
import ProfilePopup from "../ProfilePopup/ProfilePopup";

export default function Navbar() {

    function selectTab(e: any) {
        underlineRef.current!.style.left = e.target.getBoundingClientRect().left + "px";
        underlineRef.current!.style.width = e.target.getBoundingClientRect().width + "px";
    }

    const homeRef = createRef<HTMLAnchorElement>()
    const aboutRef = createRef<HTMLAnchorElement>()
    const underlineRef = createRef<HTMLDivElement>()


    useEffect(() => {
        const activeRef = window.location.pathname === "/about" ? aboutRef : homeRef;
        underlineRef.current!.style.width = activeRef.current!.getBoundingClientRect().width + "px";
        underlineRef.current!.style.left = activeRef.current!.getBoundingClientRect().left + "px";
    }, [])



    return (
        <nav className={styles.navbar}>
            <NavLink ref={homeRef} onClick={selectTab} className={({ isActive}) => isActive ? styles.active : ""} to="">Task master</NavLink>
            <NavLink ref={aboutRef} onClick={selectTab} className={({ isActive}) => isActive ? styles.active : ""} to="about">About</NavLink>
            <ProfilePopup />

            <div ref={underlineRef} className={styles.underline}></div>
        </nav>
    );
}