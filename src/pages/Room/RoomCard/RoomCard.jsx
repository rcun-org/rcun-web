import React, { useContext, useEffect, useState } from "react";
import classes from "./RoomCard.module.scss";
import { useHistory } from "react-router-dom";
import { RoomsContext } from "@/shared/lib/context";

const RoomCard = (props) => {
  let history = useHistory();

  const redirectToVideo = (event) => {
    event.stopPropagation();
    history.push(`/room/${props.room._id}`);
  };

  function prepareData(s) {
    s ||= "";
    if (s.indexOf("?v=") === -1) {
      console.log("Invalid link :c", s);
      return "";
    }
    s = s.substring(s.indexOf("?v=") + 3);
    s = s.split("&")[0];
    return s;
  }

  let [isFocused, setIsFocused] = useState(false);
  let c = document.getElementById("sub-cursor");

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-card");
    } else {
      c.classList.remove("cursor-over-card");
    }
  }, [isFocused]);

  return (
    <div
      onMouseMove={(e) => setIsFocused(true)}
      onMouseLeave={(e) => setIsFocused(false)}
      onClick={(e) => redirectToVideo(e)}
      className={classes.container}
      style={{
        backgroundImage: `url(${`https://img.youtube.com/vi/${prepareData(
          props.room.backupVideo
        )}/hqdefault.jpg`})`,
        backgroundSize: "100%",
        backgroundPosition: "center"
      }}
    >
      <div
        className={`${classes.cardTitle} ${isFocused ? "" : classes.glassy}`}
      >
        {props.room.title}
      </div>
      <div className={classes.body}></div>
      <div className={`${classes.footer}`}>
        <div>
          <div
            className={`${classes.cardTextLarge} 
            ${classes.cardTitleMarquee} 
            ${isFocused ? classes.marqueeAnimation : ""}`}
          >
            <div>
              <span>{props.room.yt_video_title}</span>
              <span>{props.room.yt_video_title}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.cardTextMedium}>
            {/*<GiRaccoonHead/>*/}
            {/*{props.room.audience.length}/8*/}
            0/8
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
