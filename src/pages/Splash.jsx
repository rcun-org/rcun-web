import React, {Component, useState} from 'react';
import RoomBrowserContainer from "../components/RoomBrowser/RoomBrowserContainer";
import {useHistory} from "react-router-dom";
import RoomBrowser from "./RoomBrowser";
import Login from "./Login";

const Splash = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const LoadingMessage = () => {
        return (
            <div className="splash-screen">
                Wait a moment while we load the app.
            </div>
        );
    }

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) return LoadingMessage();

    return Login();
    // history.push("/login");
};

export default Splash;