import React from 'react';
import BaseButton from "../UI/Button/BaseButton";
import BaseInput from "../UI/Input/BaseInput";

const RoomBar = (props) => {
    return (
        <div {...props}>
            <BaseButton onClick={()=>alert("clicked")}>Create a new room</BaseButton>
            <BaseButton>Create a new room</BaseButton>
            <BaseButton>My rooms</BaseButton>
            <BaseButton>Create a new room</BaseButton>
        </div>
    );
};

export default RoomBar;