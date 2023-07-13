import styles from './Home.module.css';
import {NavLink} from "react-router-dom";

/**
 * @desc First page the user sees before logging in.
 */


export default function Home() {



	return <nav>
		<NavLink to={'Login'}>Log in</NavLink>
		<NavLink to={'SignUp'}>Sign up</NavLink>
		Dashboard

	</nav>
}