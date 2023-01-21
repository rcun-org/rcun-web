import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/";
import classes from "./Chat.module.scss";
import {io} from "socket.io-client";

const WS_URL = process.env["REACT_APP_WS_SERVER"];

function Chat({/*socketRef*/}) {
    let autoScroll = useRef();

    let {userToken} = useContext(AuthContext);

    let {userData: {username}} = useContext(AuthContext);

    let userNameRef = useRef(username);

    let [msgHistory, setMsgHistory] = useState([]);

    useEffect(
        () => autoScroll.current.scrollIntoView({behavior: "smooth"}),
        [msgHistory]
    );

    // ws connection
    let socketRef = useRef(new io('localhost:5001/ws', {
        transports: ["websocket", "polling"],
    }));

    useEffect(() => {
        socketRef.current.onopen = function () {
            console.log("open");
            sendMessage("connected.");
        };

        socketRef.current.onmessage = function (e) {
            let msg = JSON.parse(e.data);
            setMsgHistory((prev) => prev.concat([msg]));
            console.log("new chat msg", msg);
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);

    let chatInputRef = useRef(null);

    function sendMessage(text) {
        let msg = {username: userNameRef.current, text: text || chatInputRef.current.value};
        socketRef.current.send(JSON.stringify(msg));
        console.log("sending chat msg", msg);
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
                    {msgHistory.map(({username, text}, index) => (
                        <div className={classes.msg_item} key={index}>
                            <div className={classes.msg_item_username}>{username + ': '}</div>
                            <div className={classes.msg_item_text}>{text}</div>
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
