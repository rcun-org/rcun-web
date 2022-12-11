import React, {useMemo, useState} from 'react';
import classes from './RoomBrowser.module.scss';
import RoomsList from "./RoomsList";
import RoomRightHalf from "./RoomBar/RoomBar";

import {RoomsContext} from "../../context";
import AppHeader from "../AppLayout/AppHeader";


const RoomBrowserContainer = () => {
    const [rooms, setRooms] = useState([]);
    const [roomSearch, setRoomSearch] = useState('');
    const searchedVideos = useMemo(() => {
        if (!roomSearch) {
            return rooms;
        }
        return rooms.filter(room => room.title.toLowerCase().includes(roomSearch.toLowerCase()));
    }, [roomSearch, rooms]);


    return (
        <div className={classes.container}>
            <RoomsContext.Provider value={
                {
                    rooms, setRooms,
                    searchedVideos, setRoomSearch
                }
            }
            >
                <div className={classes.header}>Browse @ RCUN</div>
                <br/>
                <RoomsList className={classes.roomsList}/>
                <RoomRightHalf className={classes.roomBar}/>
            </RoomsContext.Provider>
        </div>
    );
};

export default RoomBrowserContainer;