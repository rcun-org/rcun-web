import React, {useEffect, useState} from 'react';
import RoomCard from "../UI/RoomCard/RoomCard";


import axios from "axios";

const API_URL = process.env["REACT_APP_API_SERVER"]




const RoomsList = (props) => {
    const [rooms, setRooms] = useState([])
    useEffect(()=>{getRooms()},[])
    console.log(rooms)

    function getRooms() {
        async function getting(){
            let roomList = await axios.get(API_URL + 'room').then(response=>response.data)
            console.log('room list', roomList);
            setRooms(roomList)
        }
        getting()
    }


    return (
        <div {...props}>
            { rooms.map((room, index) => {
                return <RoomCard key={index} room={room} index={index}/>
            })}
        </div>
    );
};

export default RoomsList;