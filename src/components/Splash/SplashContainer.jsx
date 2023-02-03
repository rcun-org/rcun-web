import React from 'react';
import SplashIcon from "./SplashIcon";
import classes from './Splash.module.scss';

const SplashContainer = () => {
    return (
        <div className={classes.splashContainer}>
            <SplashIcon className={classes.splashIconDesign} />
            <div className={classes.splashContainerText}>
                {/*r c u n*/}
            </div>
        </div>
    );
};

export default SplashContainer;
