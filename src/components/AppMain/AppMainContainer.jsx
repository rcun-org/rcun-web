import React, {useState} from 'react';
import classes from './AppMain.module.scss'
import RoomsList from "./RoomsList";
import RoomBar from "./RoomBar/RoomBar";

import {RoomsContext} from "../../context";


const AppMainContainer = () => {
    const [rooms, setRooms] = useState([])
    return (
        <div className={classes.container}>
            <RoomsContext.Provider value={
                {
                    rooms, setRooms
                }
            }
            >
                <RoomsList className={classes.roomsList}/>
                <RoomBar className={classes.roomBar}/>
            </RoomsContext.Provider>
        </div>
    );
};

export default AppMainContainer;