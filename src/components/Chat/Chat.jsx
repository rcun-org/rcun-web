import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/";
import classes from "./Chat.module.scss";
import { io } from "socket.io-client";
import { getRoomById } from "@/services/room.services";
import { useParams } from "react-router-dom";
import BaseButton from "../UI/Button/BaseButton";
import BaseInput from "../UI/Input/BaseInput";
import MovieIcon from "@mui/icons-material/Movie";
import { useAtom } from "jotai";
import { userDataAtom, userTokenAtom } from "@/stores/auth-store";
import transformMsgHistoryToGroup from "./utils";
import MessageGroup from "../UI/Message/messageGroup";
// import jotai
import { isChatCollapsedAtom } from "../../stores/chat-store";
import cx from "classnames";

const WS_URL = process.env["REACT_APP_WS_SERVER"];

function Chat(props) {
  let autoScroll = useRef();
  const { id } = useParams();

  const [userData] = useAtom(userDataAtom);
  const myUsername = userData.username;

  const [isChatCollapsed] = useAtom(isChatCollapsedAtom);

  let [msgHistory, setMsgHistory] = useState([]);

  const [roomData, setRoomData] = useState(null);

  useEffect(
    () => autoScroll.current.scrollIntoView({ behavior: "smooth" }),
    [msgHistory]
  );

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
  useEffect(() => {
    if (!!roomData) {
      socketRef.current = new io(WS_URL, {
        transports: ["websocket", "polling"]
      });
      socketRef.current.on("connect", function () {
        socketRef.current.emit("room:join", {
          roomId: roomData["_id"],
          username: myUsername
        });
        sendMessage("joined.");
      });
      socketRef.current.on("chat:msg", function (msg) {
        setMsgHistory((prev) => [...prev, msg]);
        console.log("new chat msg", msg);
      });
      socketRef.current.on("room:leave", (d) => {
        const { username } = d;
        sendMessage(username + " left the room.");
      });

      window.addEventListener("beforeunload", () => {
        sendMessage("left.");
      });
    }
  }, [roomData]);

  let [enterText, setEnterText] = useState("");

  function sendMessage(text) {
    const textToSend = text || enterText;

    if (textToSend) {
      let msg = {
        username: myUsername,
        text: textToSend
      };
      // socketRef.current.send(JSON.stringify(msg));
      console.log("sending chat msg", msg);
      socketRef.current.emit("chat:msg", msg);
      setEnterText("" + "");
    }
  }

  function broadcastRoomState(change) {
    change.sender = myUsername;
    console.log("SENT socket msg", change);
    socketRef.current.emit("room:stateUpdate", change);
    setEnterText("" + "");
  }

  function handleInputChange(event) {
    setEnterText(event.target.value);
  }

  //  Checks if pressed button is 'Enter' to send the message
  function handleEnterPush(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function handleUpdateVideo(event) {
    let url = enterText;
    // redux?
    let change = {
      video: {
        link: url
      }
    };
    broadcastRoomState(change);
  }

  const msgHistoryGroup = transformMsgHistoryToGroup(msgHistory);

  return (
    <div
      className={cx(classes.chat_window, isChatCollapsed && classes.collapsed)}
    >
      <div className={cx(classes.history_wrapper)}>
        <div className={cx(classes.msg_history)} tabIndex="0">
          {msgHistoryGroup.map((messages, index) => {
            return (
              <MessageGroup
                messages={messages}
                key={"_" + index}
                selfUsername={myUsername}
              />
            );
          })}
          <div
            style={{ float: "left", clear: "both", opacity: "0" }}
            ref={autoScroll}
          ></div>
        </div>
      </div>
      <div
        className={cx(
          classes.enterSection,
          isChatCollapsed && classes.collapsed
        )}
      >
        <BaseInput
          className={classes.input}
          value={enterText}
          onChange={handleInputChange}
          onKeyUp={handleEnterPush}
          placeholder="Type a message"
        />

        <BaseButton onClick={handleUpdateVideo} className={classes.btn}>
          <MovieIcon />
        </BaseButton>
      </div>
    </div>
  );
}

export default Chat;
