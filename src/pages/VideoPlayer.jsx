import React from 'react';
import YouTube from "react-youtube";

const VideoPlayer = () => {
    const opts = {
        width: '360',
        height: '240',
    };
    return (
        <div>
            video
            <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
                onReady={() => console.log("youtube ready")}
            />
        </div>
    );
};

export default VideoPlayer;