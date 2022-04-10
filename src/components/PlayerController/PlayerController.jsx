import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/";
import classes from "./Chat.module.scss";

const WS_URL = process.env["REACT_APP_WS_SERVER"]

function Chat(props) {
    let socketRef = useRef(new SockJS(WS_URL + "room"));

    let [playerState, setPlayerState] = useState({
        playerStatus: "paused",
        playerTimecode: 0,
    });

    useEffect(() => {
        socketRef.current.onopen = function () {
            console.log("open");
        };

        socketRef.current.onmessage = function (e) {
            let playerEvent = e.data;
            console.log("player event data received", e.data);
            setPlayerState((prev) => playerEvent);
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);

    let chatInputRef = useRef(null);

    function sendPlayerEvent() {
        let msg = chatInputRef.current.value;
        socketRef.current.send(msg);
        chatInputRef.current.value = "";
    }

    //  Checks if pressed button is 'Enter' to send the message
    function handleEnterPush(event) {
        if (event.key === "Enter") {
            sendPlayerEvent();
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
                        style={{float: "left", clear: "both", opacity: "0"}}
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
