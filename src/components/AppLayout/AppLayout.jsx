import React from 'react';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import classes from './AppLayout.module.scss'

const AppLayout = (props) => {
    return (
        <div className={classes.mainContainer}>
            <AppHeader/>
            <div className={classes.bodyContainer}>
                {props.children}
            </div>
            <AppFooter/>
        </div>
    );
};

export default AppLayout;