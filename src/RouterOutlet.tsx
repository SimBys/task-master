import {Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import {User} from "./pages/auth";

type Props = {
    user: User | null
}

export function RouterOutlet(props: Props) {
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
                <Route path="login" element={<LogIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="about" element={<About/>}/>
            </Routes>
        </>
    );
};
