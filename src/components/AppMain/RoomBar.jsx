import React from 'react';
import BaseButton from "../UI/Button/BaseButton";
import BaseInput from "../UI/Input/BaseInput";
import Chat from '../Chat'

const RoomBar = (props) => {
    return (
        <div {...props}>
            <BaseButton onClick={()=>alert("clicked")}>Create a new room</BaseButton>
            <BaseButton>Create a new room</BaseButton>
            <BaseButton>My rooms</BaseButton>
            <BaseButton>Create a new room</BaseButton>
            <Chat />
        </div>
    );
};

export default RoomBar;