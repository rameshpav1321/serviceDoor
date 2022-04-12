import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ServiceProvider } from "./context/ServiceContext";

ReactDOM.render(
    <ServiceProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
     </ServiceProvider>
        , document.getElementById('root')
);
