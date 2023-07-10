import './Navbar.css'
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <div className={'navbar'}>
            <Link to="">Task master</Link>
            <Link to="about">About</Link>
            <div>Profile</div>
        </div>
    );
}