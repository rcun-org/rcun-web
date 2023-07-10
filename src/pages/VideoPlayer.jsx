import React, { useState } from "react"
import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"

const VideoPlayer = ({ videoId, isPlaying, forwardedRef }) => {
  const [roomData, setRoomData] = useState()
  const opts = {
    width: "640",
    height: "480",
  }
  //   console.log("!!! Video id: ", videoId)
  return (
    <div>
      <ReactPlayer
        url={videoId}
        // videoId={videoId}
        opts={opts}
        // onReady={() => console.log("youtube ready")}
        width="100%"
        height="100%"
        controls={true}
        playing={isPlaying}
        ref={forwardedRef}
      />
    </div>
  )
}

export default VideoPlayer
