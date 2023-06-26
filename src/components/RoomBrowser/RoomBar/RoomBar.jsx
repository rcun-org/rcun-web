import React, {useState} from 'react';
import BaseButton from "../../UI/Button/BaseButton";
import Chat from '../../Chat'
import {useHistory} from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Logout from "../../Logout/Logout";
import SearchRoom from "./SearchRoom";

const RoomBar = (props) => {
    return (
        <div {...props}>
            <CreateRoom/>
            <JoinRoom/>
            <SearchRoom/>
            <Logout/>
        </div>
    );
};

export default RoomBar;