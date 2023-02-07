import React, {useEffect, useMemo, useState} from 'react';
import classes from './RoomBrowser.module.scss';
import RoomsList from "./RoomsList";
import RoomRightHalf from "./RoomBar/RoomBar";

import {RoomsContext} from "../../context";
import AppHeader from "../AppLayout/AppHeader";
import {Switch} from "@mui/material";

const RoomBrowserContainer = () => {
    const [rooms, setRooms] = useState([]);
    const [roomSearch, setRoomSearch] = useState('');
    const [performanceSwitch, setPerformanceSwitch] = useState(false);

    useEffect(() => {
        let cachePS = localStorage.getItem("performanceSwitch")
        if (!!cachePS) {
            setPerformanceSwitch(cachePS)
        }
    }, [])

    const handlePerformanceSwitch = (e, v) => {
        setPerformanceSwitch(v)
        localStorage.setItem("performanceSwitch", v)
    }

    const searchedVideos = useMemo(() => {
        if (!roomSearch) {
            return rooms;
        }
        return rooms.filter(room => room.title.toLowerCase().includes(roomSearch.toLowerCase()));
    }, [roomSearch, rooms]);

    return (
        <div className={classes.container}>
            <RoomsContext.Provider value={{
                rooms, setRooms,
                searchedVideos, setRoomSearch,
                performanceSwitch,
            }}>
                <div className={classes.header}>
                    Browse @ RCUN |
                    <Switch
                        label="Performance"
                        color="default"
                        checked={performanceSwitch}
                        onChange={handlePerformanceSwitch}
                        name="performance"
                    />
                </div>
                <br/>
                <RoomsList className={classes.roomsList}/>
                <RoomRightHalf className={classes.roomBar}/>
            </RoomsContext.Provider>
        </div>
    );
};

export default RoomBrowserContainer;