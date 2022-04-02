import React, { useState } from 'react';
import BaseButton from "../UI/Button/BaseButton";
import Chat from '../Chat'
import InputButton from '../UI/InputButton';
import { useHistory } from "react-router-dom";
const RoomBar = (props) => {
    let history = useHistory();

    let [joinBtnPushed,setJoinBtnPushed] = useState(false)
    
    function handleJoinBtnPush(){
        setJoinBtnPushed(true)
    }

    function hideJoinBtn(){
        setJoinBtnPushed(false)
    }

    return (
        <div {...props}>
            <BaseButton onClick={()=>history.push("/new_room")}>Create a new room</BaseButton>
            {joinBtnPushed? <InputButton hideJoinBtn={hideJoinBtn} /> : <BaseButton onClick={handleJoinBtnPush}>Join by room identifier</BaseButton>}
            <BaseButton>My rooms</BaseButton>
            <BaseButton>Search</BaseButton>
            <Chat />
        </div>
    );
};

export default RoomBar;