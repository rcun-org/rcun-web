import React, { useEffect, useState, useRef, useContext } from "react";
import VideoPlayer from "../VideoPlayer";
import { useParams } from "react-router-dom";
import Chat from "../../components/Chat";
import { getRoomById } from "../../services/room.services";
// import PlayerController from "../../components/PlayerController"

import classes from "./room.module.scss";
import { io } from "socket.io-client";
import CursorController from "../../components/CursorController/CursorController";
import { useAtom } from "jotai";
import { userDataAtom } from "../../stores/auth-store";
import { isChatCollapsedAtom } from "../../stores/chat-store";
import { cursorsAtom } from "../../stores/cursor-store";
import CursorSpawner from "../../components/CursorController/CursorSpawner";

const WS_URL = process.env["REACT_APP_WS_SERVER"];
const ALLOWED_DELAY = 3;

const Room = () => {
  const { id } = useParams();

  const [roomData, setRoomData] = useState(null);

  const [userData] = useAtom(userDataAtom);
  const username = userData.username;

  let userNameRef = useRef(username);

  const [cursors, setCursors] = useAtom(cursorsAtom);

  // ws connection
  let socketRef = useRef(0);

  // get room from api
  useEffect(() => {
    const fetchRoomData = async () => {
      let rd = await getRoomById(id);
      setRoomData(rd);
    };
    fetchRoomData().catch();
  }, []);

  // ws
  const [_hasRun, _setHasRun] = useState(false);
  useEffect(() => {
    if (!!roomData && !_hasRun) {
      _setHasRun(true);

      socketRef.current = new io(WS_URL, {
        transports: ["websocket", "polling"]
      });

      socketRef.current.on("connect", function () {
        console.log("on connect success");
        console.log("room data", roomData);
        socketRef.current.emit("room:join", {
          roomId: roomData["_id"],
          username: userNameRef.current
        });
      });
      socketRef.current.on("connect_error", (e) => {
        console.error("socketIO ERROR connecting!", e);
        socketRef.current.io.opts.transports = ["polling", "websocket"];
      });

      /// receive room events
      socketRef.current.on("room:stateUpdate", function (e) {
        console.log("received room update", e, typeof e);
        let roomEventChange = e;
        let newState = roomData;
        for (let k in roomEventChange) {
          if (k !== "sender") {
            newState[k] = roomEventChange[k];
          }
          if (k === "video") {
            newState["backupVideo"] = roomEventChange.video.link;
          }
        }
        console.log("setting new roomstate:", newState);
        setRoomData({ ...newState });
        // fetchRoomData()
      });

      socketRef.current.on("room:leave", (d) => {
        const { username } = d;
        // cursors[username] = undefined;
        delete cursors[username];
        setCursors({ ...cursors });
      });

      /// receive player events
      socketRef.current.on("player:event", function (e) {
        console.log("received socket msg", JSON.parse(e));
        let playerEventChange = JSON.parse(e);
        let newState = playerState;
        for (let k in playerEventChange) {
          if (k !== "sender") {
            newState[k] = playerEventChange[k];
          }
        }
        const timestampReceiver = new Date().getTime();
        const timestampSender = playerEventChange.timestamp;
        const travelDelay =
          (Math.abs(timestampReceiver - timestampSender) + 40) / 1000;

        // if (username !== playerEventChange.sender) {
        playerRef.current.seekTo(newState.playerTimecode + travelDelay);

        newState.playerTimecode =
          playerEventChange.playerTimecode + travelDelay;
        // }

        console.log("event change received:", playerEventChange);

        console.log("Travel delay:", travelDelay, "s");

        setPlayerState({ ...newState });
      });

      /// receive cursor events
      socketRef.current.on("cursor:move", function (data) {
        let cursorData = data.data;
        if (cursorData.sender === userNameRef.current) {
          return;
        }

        // console.log("received cursor move", cursorData, cursors);
        cursors[cursorData.sender] = cursorData;
        setCursors({ ...cursors });
      });

      /// send cursor events
      window.addEventListener("mousemove", (event) => {
        const data = {};
        data.sender = userNameRef.current;

        let vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
        let vh = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );

        const x = (event.clientX / vw) * 100;
        const y = (event.clientY / vh) * 100;

        data.x = x;
        data.y = y;
        socketRef.current.emit("cursor:move", { data });
        // console.log("cursor:move event sent", data);
      });
    }

    console.log("Room data changed:", roomData);
  }, [roomData]);

  // player state
  let [playerState, setPlayerState] = useState({
    isPaused: true,
    playerTimecode: 0
  });

  const backupVideoRef = useRef(null);
  useEffect(() => {
    if (roomData) {
      backupVideoRef.current = roomData.backupVideo;
    }
  }, [roomData]);

  const playerModeRef = useRef(null);
  useEffect(() => {
    if (roomData) {
      playerModeRef.current = roomData.backupPlayerState.mode;
    }
  }, [roomData]);

  // send function
  function broadcastChange(change) {
    change.sender = userNameRef.current;
    change.timestamp = new Date().getTime();
    let msg = JSON.stringify(change);
    console.log("SENT socket msg", JSON.parse(msg));
    socketRef.current.emit("player:event", msg);
  }

  // button handlers
  function handleBackArrowPush(event) {
    let currentTime = playerRef.current.getCurrentTime();
    let change = {
      playerTimecode: currentTime - 5
    };
    let newState = {
      ...playerState,
      ...change
    };
    setPlayerState(newState);
    broadcastChange(change);
    playerRef.current.seekTo(currentTime - 5); // perform action
  }

  function handleForwardArrowPush(event) {
    let currentTime = playerRef.current.getCurrentTime();
    let change = {
      playerTimecode: currentTime + 5
    };
    let newState = {
      ...playerState,
      ...change
    };
    setPlayerState(newState);
    broadcastChange(change);
    playerRef.current.seekTo(currentTime + 5);
  }

  function handlePlayPausePush(event) {
    let change = {
      isPaused: !playerState.isPaused,
      playerTimecode: playerRef.current.getCurrentTime()
    };
    let newState = {
      ...playerState,
      ...change
    };
    setPlayerState(newState);
    broadcastChange(change);
  }

  let playerRef = useRef();

  const [isChatCollapsed, setIsChatCollapsed] = useAtom(isChatCollapsedAtom);
  function handleChatToggle(event) {
    setIsChatCollapsed(!isChatCollapsed);
    console.log("Chat is now collapsed?", isChatCollapsed);
  }

  // ui
  return (
    <div className={classes.container}>
      {!roomData ? (
        <h3 style={{ color: "white" }}></h3>
      ) : (
        <div style={{ height: "100%" }}>
          <div className={classes.video_player_container}>
            <CursorSpawner />

            <CursorController
              handleBackArrowPush={handleBackArrowPush}
              handlePlayPausePush={handlePlayPausePush}
              handleForwardArrowPush={handleForwardArrowPush}
              handleChatToggle={handleChatToggle}
              isPaused={playerState.isPaused}
            />

            <VideoPlayer
              className={classes.video_player}
              videoId={roomData.backupVideo}
              isPlaying={!playerState.isPaused}
              forwardedRef={playerRef}
            />
          </div>

          <Chat />
        </div>
      )}
    </div>
  );
};

export default Room;
