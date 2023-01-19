import React, { Component, useState } from 'react';
import RoomBrowserContainer from "../components/RoomBrowser/RoomBrowserContainer";
import { useHistory } from "react-router-dom";
import RoomBrowser from "./RoomBrowser";
import Login from "./Login";
import SplashContainer from "../components/Splash/SplashContainer";
import classes from "../components/Splash/Splash.module.scss";

const Splash = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const LoadingMessage = () => {
        return (
            <div className={classes.container}>
                <SplashContainer />
            </div>
        );
    }

    setTimeout(() => {
        setLoading(false);
    }, 2500);

    if (loading) return LoadingMessage();

    return Login();
    // history.push("/login");
};

export default Splash;