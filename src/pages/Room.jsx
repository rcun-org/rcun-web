import React, {useEffect, useState} from 'react';
import VideoPlayer from "./VideoPlayer";
import {useParams} from 'react-router-dom'
import Chat from '../components/Chat'
import {getRoomById} from "../services/room.services";

const Room = () => {
    const {id} = useParams()
    const [roomData, setRoomData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchRoomData = async () => {
            setLoading(true)
            const roomData = await getRoomById(id)
            setRoomData(roomData)
            setLoading(false)
        }
        fetchRoomData().catch()

    }, [])
    return (
        <div>
            {loading ?
                'loading...' :
                <div>
                    <VideoPlayer videoId={roomData.yt_video_id}/>
                    <Chat/>
                </div>
            }
        </div>
    );
};

export default Room;