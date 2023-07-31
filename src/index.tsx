import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {BrowserRouter} from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        {/*<BrowserRouter>*/}
        <Router>
            <App />
        </Router>
        {/*</BrowserRouter>*/}
    </React.StrictMode>
);
