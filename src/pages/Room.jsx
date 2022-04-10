import React from 'react';
import VideoPlayer from "./VideoPlayer";
import Chat from '../components/Chat'
const Room = () => {
    return (
        <div>
            room:
            <VideoPlayer />
            <Chat/>
        </div>
    );
};

export default Room;