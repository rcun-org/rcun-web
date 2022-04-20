import React from 'react';
import classes from './AppLayout.module.scss'
import {GiRaccoonHead} from "react-icons/gi";

const AppHeader = () => {
    return (
        <div className={classes.headerContainer}>
            <GiRaccoonHead size={'30px'}/>
            <span className={classes.headerContainerLogo}>
                RCUN
            </span>
        </div>
    );
};

export default AppHeader;