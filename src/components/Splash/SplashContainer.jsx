import React from 'react';
import SplashIcon from "./SplashIcon";
import classes from './Splash.module.scss';

const SplashContainer = () => {
    return (
        <div className={classes.splashContainer}>
            <SplashIcon className={classes.splashIconDesign} />
            <div className={classes.splashContainerText}>
                Wait a moment while we load the app.
            </div>
        </div>
    );
};

export default SplashContainer;
