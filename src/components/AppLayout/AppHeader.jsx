import React from 'react';
import classes from './AppLayout.module.scss'
import {SiNintendogamecube} from "react-icons/si";

const AppHeader = () => {
    return (
        <div className={classes.headerContainer}>
            <SiNintendogamecube size={'30px'}/>
            <span className={classes.headerContainerLogo}>
                RCUN
            </span>
        </div>
    );
};

export default AppHeader;