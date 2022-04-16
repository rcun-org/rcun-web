import React from 'react';
import AppHeader from "./AppHeader";
import classes from './AppLayout.module.scss'

const AppLayout = (props) => {
    return (
        <div className={classes.mainContainer}>
            <AppHeader/>
            <div className={classes.bodyContainer}>
                {props.children}
            </div>
        </div>
    );
};

export default AppLayout;