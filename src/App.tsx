import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import {createContext, useEffect, useState} from "react";
import About from "./pages/About";
import {Helmet} from "react-helmet";
import {TodoTaskType} from "./Components/Todo/TodoTask";
import {loadTodoData} from "./DataController";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {logIn, signOut, signUp, User} from "./pages/auth";
import {createTheme, ThemeProvider} from "@mui/material";
import {RouterOutlet} from "./RouterOutlet";

type TodoDataContextType = {
	tasks: TodoTaskType[],
	setTasks: Function
}
export const TodoDataContext = createContext<TodoDataContextType>(null!);

type AuthContextType = {
	user: User | null;
	logIn: (usernameOrEmail: string, password: string) => boolean;
	signOut: VoidFunction;
	signUp: (username: string, email: string, password: string) => void;
}
export const AuthContext = createContext<AuthContextType>(null!);

// Load the user from local storage
const initialUserRaw = localStorage.getItem('user')
// Parse the user from string to User object
// This is the last user logged in or null
const initialUser: User | null = initialUserRaw ? JSON.parse(initialUserRaw) : null

export default function App() {
	let [user, setUser] = useState(initialUser);
	const [todoData, setTodoData] =
		useState<TodoTaskType[]>(initialUser ? loadTodoData(initialUser.username) : []);

	const navigate = useNavigate();


	useEffect(() => {
		if (user)
			setTodoData(loadTodoData(user.username))
	}, [user]);

	const _logIn = (usernameOrEmail: string, password: string) => {
		const result = logIn(usernameOrEmail, password, setUser)

		if (result)
			navigate('')

		return result
	}

	function _signOut() {
		navigate('')
		setUser(null)
		signOut()
		setTodoData([])
	}

	const _signUp = (username: string, email: string, password: string) => {
		navigate('')
		signUp(username, email, password, setUser);
	}

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<AuthContext.Provider value={{user, logIn: _logIn, signOut: _signOut, signUp: _signUp}}>
				<TodoDataContext.Provider value={{tasks: todoData, setTasks: setTodoData}}>
					{user && <Navbar/>}
					<RouterOutlet user={user}/>
				</TodoDataContext.Provider>
			</AuthContext.Provider>
		</ThemeProvider>
	);
}
