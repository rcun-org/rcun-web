import React, {useContext, useEffect, useState} from 'react';
import RoomCard from "../UI/RoomCard/RoomCard";


import {AuthContext, RoomsContext} from "../../context";
import {getRooms} from "../../services/room.services";

const API_URL = process.env["REACT_APP_API_SERVER"]


const RoomsList = (props) => {
    const {rooms, setRooms} = useContext(RoomsContext)
    const [loading, setLoading] = useState(false)

    async function fetchRooms() {
        setLoading(true)
        const roomsData = await getRooms()
        setRooms(roomsData)
        setLoading(false)
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <div {...props}>
            {
                loading ? <h3 style={{color:'white'}}>Loading rooms...</h3>
                    : rooms.map((room, index) => {
                        return <RoomCard key={index} room={room} index={index}/>
                    })
            }
        </div>
    );
};

export default RoomsList;