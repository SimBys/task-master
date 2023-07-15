import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Navbar from "./Components/Navbar";
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

export const TodoDataContext = createContext<{ tasks: TodoTaskType[], setTasks: Function }>(null!);

type AuthContextType = {
	user: any;
	logIn: (email: string, password: string) => boolean;
	signOut: VoidFunction;
	signUp: (username: string, email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function App() {
	const [todoTasks, setTodoTasks] = useState<TodoTaskType[]>(loadTodoData() ?? []);
	let [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();


	const _logIn = (email: string, password: string) => {
		const res = logIn(email, password, setUser)
		if (res)
			navigate('')

		return res
	}

	function _signOut() {
		navigate('')
		setUser(null)
		signOut()
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
				<TodoDataContext.Provider value={{tasks: todoTasks, setTasks: setTodoTasks}}>
					{user && <Navbar/>}
					<RouterOutlet user={user}/>
				</TodoDataContext.Provider>
			</AuthContext.Provider>
		</ThemeProvider>
	);
}

const RouterOutlet = (props: { user: any }) => {
	const location = useLocation();
	const [title, setTitle] = useState("");

	useEffect(() => {
		const currentPath = location.pathname;

		// Set the title based on the current route
		switch (currentPath) {
			case "/about":
				setTitle("About - Task master");
				break;
			case "/login":
				setTitle("Log in - Task master");
				break;
			case "/sign-up":
				setTitle("Sign up - Task master");
				break;
			default:
				setTitle("Task master");
		}
	}, [location]);

	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Routes>
				<Route path="" element={props.user ? <Dashboard/> : <Home/>}/>
				<Route path="login" element={
					<LogIn/>
				}/>
				<Route path="sign-up" element={<SignUp/>}/>
				<Route path="about" element={<About/>}/>
			</Routes>
		</>
	);
};
