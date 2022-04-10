import React, {useState} from 'react';
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";

const VideoPlayer = ({videoId}) => {
    const [roomData, setRoomData] = useState();
    const opts = {
        width: '640',
        height: '480',
    };
    return (
        <div>
            <ReactPlayer
                url={videoId}
                // videoId={videoId}
                // opts={opts}
                // onReady={() => console.log("youtube ready")}
                width='100%'
                height='100%'
                controls={true}
            />
        </div>
    );
};

export default VideoPlayer;