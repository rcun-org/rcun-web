import React, {useContext, useState} from 'react';
import BaseInput from "../UI/Input/BaseInput";
import BaseButton from "../UI/Button/BaseButton";
import {createRoom} from "../../services/room.services";
import classes from "../Login/Login.module.scss";
import {RoomsContext} from "../../context";

const CreateRoomForm = ({roomCreated}) => {
    const {rooms, setRooms} = useContext(RoomsContext)

    const [roomData, setRoomData] = useState({
        title: '', yt_video_id: ''
    })

    const handleCreate = async () => {
        const newRoomsList = await createRoom(roomData)
        setRooms(newRoomsList)
        roomCreated(true)
    }

    return (
        <div className={classes.formContainerInputList}>
            <BaseInput value={roomData.username}
                       onChange={(event) => setRoomData({...roomData, title: event.target.value})}
                       type='text'
                       placeholder="Room title"/>

            <BaseInput value={roomData.password}
                       onChange={(event) => setRoomData({...roomData, yt_video_id: event.target.value})}
                       type='text'
                       placeholder="Youtube video link"
            />
            <BaseButton onClick={handleCreate}>Create room</BaseButton>
        </div>
    );
};

export default CreateRoomForm;