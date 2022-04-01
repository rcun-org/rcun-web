import React from 'react';
import BaseButton from "../UI/Button/BaseButton";
import Chat from '../Chat'
import { useHistory } from "react-router-dom";
const RoomBar = (props) => {
    let history = useHistory();


    return (
        <div {...props}>
            <BaseButton onClick={()=>history.push("/new_room")}>Create a new room</BaseButton>
            <BaseButton>Create a new room</BaseButton>
            <BaseButton>My rooms</BaseButton>
            <BaseButton>Create a new room</BaseButton>
            <Chat />
        </div>
    );
};

export default RoomBar;