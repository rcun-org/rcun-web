import React, {useState} from 'react';
import YouTube from "react-youtube";
import {useParams} from "react-router-dom";

const VideoPlayer = ({videoId}) => {
    const [roomData, setRoomData] = useState()
    const opts = {
        width: '640',
        height: '480',
    };
    return (
        <div>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={() => console.log("youtube ready")}
            />
        </div>
    );
};

export default VideoPlayer;