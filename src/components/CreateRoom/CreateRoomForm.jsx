import React, {useState} from 'react';
import BaseInput from "../UI/Input/BaseInput";
import {login} from "../../services/auth.service";
import BaseButton from "../UI/Button/BaseButton";
import {createRoom} from "../../services/room.services";

const CreateRoomForm = ({className, onLogin}) => {
    const [roomData, setRoomData] = useState({
        title: '', yt_video_id: ''
    })

    const handleCreate = async () => {
        await createRoom(roomData)

        // setRoomData({
        //     title: '', yt_video_id: ''
        // })
    }
    return (
        <div className={className}>
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