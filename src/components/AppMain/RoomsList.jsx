import React from 'react';
import RoomCard from "../UI/RoomCard/RoomCard";

const RoomsList = (props) => {
    return (
        <div {...props}>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
            <RoomCard/>
        </div>
    );
};

export default RoomsList;