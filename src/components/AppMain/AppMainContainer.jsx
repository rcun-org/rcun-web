import React from 'react';
import classes from './AppMain.module.scss'
import RoomsList from "./RoomsList";
import RoomBar from "./RoomBar/RoomBar";


const AppMainContainer = () => {
    return (
        <div className={classes.container}>
            <RoomsList className={classes.roomsList}/>
            <RoomBar className={classes.roomBar}/>
        </div>
    );
};

export default AppMainContainer;