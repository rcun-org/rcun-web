import React, { useState } from "react"
import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"

const VideoPlayer = ({ videoId, isPlaying, forwardedRef }) => {
  const [roomData, setRoomData] = useState()
  const opts = {
    width: "640",
    height: "480",
  }
  console.log("video source:", videoId)
  return (
    <div>
      <ReactPlayer
        url={videoId}
        // url={"http://localhost:3000/240.mp4:hls:manifest.m3u8"}
        // videoId={videoId}
        opts={opts}
        // onReady={() => console.log("youtube ready")}
        width="100%"
        height="100%"
        controls={true} // TODO controls false
        playing={isPlaying}
        ref={forwardedRef}
      />
    </div>
  )
}

export default VideoPlayer
