import React from 'react';
import YouTube from "react-youtube";
import {
    useParams
} from "react-router-dom";

const VideoPlayer = () => {
    let { yt_video_id } = useParams();
    console.log("yt_video_id", yt_video_id);
    const opts = {
        width: '640',
        height: '480',
    };
    return (
        <div>
            <YouTube
                videoId={yt_video_id.toString()}
                opts={opts}
                onReady={() => console.log("youtube ready")}
            />
        </div>
    );
};

export default VideoPlayer;