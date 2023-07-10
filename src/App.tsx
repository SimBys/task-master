import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { fakeAuthProvider } from "./pages/auth";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import { createContext, useContext, useEffect, useState } from "react";
import About from "./pages/About";
import { Helmet } from "react-helmet";

export default function App() {
    return (
        <AuthProvider>
            <Navbar />
            <RouterWithTitles />
        </AuthProvider>
    );
}

const RouterWithTitles = () => {
    const location = useLocation();
    const [title, setTitle] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;

        // Set the title based on the current route
        switch (currentPath) {
            case "/":
                setTitle("Task master");
                break;
            case "/about":
                setTitle("About - Task master");
                break;
            default:
                setTitle("My App");
        }
    }, [location]);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>
        </>
    );
};

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username") as string;

        auth.signin(username, () => {
            navigate(from, { replace: true });
        });
    }

    return (
        <div>
            <p>You must log in to view the page at {from}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" />
                </label>{" "}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
