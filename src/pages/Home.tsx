import {NavLink} from "react-router-dom";
import {Button} from '@mui/material'

/**
 * @desc First page the user sees before logging in.
 */


export default function Home() {



	return <nav>
		<NavLink to={'login'}><Button>Log in</Button></NavLink>
		<NavLink to={'sign-up'}><Button>Sign up</Button></NavLink>
	</nav>
}
