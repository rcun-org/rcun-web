import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/";
import classes from "./Chat.module.scss";

const WS_URL = process.env["REACT_APP_WS_SERVER"]
function Chat(props) {
  let socketRef = useRef(new SockJS(WS_URL + "room"));

  let autoScroll = useRef();

  let { userToken } = useContext(AuthContext);

  console.log(userToken);

  let [msgHistory, setMsgHistory] = useState([]);

  useEffect(
    () => autoScroll.current.scrollIntoView({ behavior: "smooth" }),
    [msgHistory]
  );

  useEffect(() => {
    socketRef.current.onopen = function () {
      console.log("open");
    };

    socketRef.current.onmessage = function (e) {
      let msg = e.data;
      console.log(e.data);
      setMsgHistory((prev) => prev.concat([msg]));
    };

    socketRef.current.onclose = function () {
      console.log("close");
    };
  }, []);

  let chatInputRef = useRef(null);

  function sendMessage() {
    let msg = chatInputRef.current.value;
    socketRef.current.send(msg);
    chatInputRef.current.value = "";
  }

  //  Checks if pressed button is 'Enter' to send the message
  function handleEnterPush(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className={classes.chat_window}>
      <div className={classes.history_wrapper}>
        <div className={classes.msg_history} tabIndex="0">
          {msgHistory.map((item, index) => (
            <div className={classes.msg_item} key={index}>
              {"Message: " + item}
            </div>
          ))}
          <div
            style={{ float: "left", clear: "both", opacity: "0" }}
            ref={autoScroll}
          ></div>
        </div>
      </div>

      <div className={classes.msg_entry}>
        <input
          type="text"
          onKeyDown={handleEnterPush}
          ref={chatInputRef}
          placeholder="Say something..."
        />
      </div>
    </div>
  );
}

export default Chat;
