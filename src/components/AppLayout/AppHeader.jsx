import React from 'react';
import classes from './AppLayout.module.scss'

const AppHeader = () => {
    return (
        <div className={classes.headerContainer}>
            <span className={classes.headerContainerLogo}>RCUN</span>
        </div>
    );
};

export default AppHeader;