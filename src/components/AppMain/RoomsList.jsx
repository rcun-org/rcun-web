import React, {useContext, useEffect, useState} from 'react';
import RoomCard from "../UI/RoomCard/RoomCard";


import axios from "axios";
import {AuthContext, RoomsContext} from "../../context";
import {getRooms} from "../../services/room.services";

const API_URL = process.env["REACT_APP_API_SERVER"]


const RoomsList = (props) => {
    const {rooms, setRooms} = useContext(RoomsContext)
    useEffect(() => {
        const fetchData = async () => {
            const roomsData = await getRooms()
            setRooms(roomsData)
        }
        fetchData().catch()
    }, [])


    return (
        <div {...props}>
            {rooms.map((room, index) => {
                return <RoomCard key={index} room={room} index={index}/>
            })}
        </div>
    );
};

export default RoomsList;