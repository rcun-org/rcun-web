import React from 'react';
import YouTube from "react-youtube";

const AppMain = () => {
    var opts = {
        width: '360',
        height: '240',
    };
    return (
        <div>
            Main
            <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
                onReady={() => console.log("youtube ready")}
            />
        </div>
    );
};

export default AppMain;