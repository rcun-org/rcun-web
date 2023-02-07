import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/";
import classes from "./Chat.module.scss";
import {io} from "socket.io-client";
import {getRoomById} from "../../services/room.services";
import {useParams} from "react-router-dom";

const WS_URL = process.env["REACT_APP_WS_SERVER"];

function Chat({/*socketRef*/}) {
    let autoScroll = useRef();
    const {id} = useParams();
    let {userToken} = useContext(AuthContext);
    let {userData: {username}} = useContext(AuthContext);
    let userNameRef = useRef(username);
    let [msgHistory, setMsgHistory] = useState([]);
    const [roomData, setRoomData] = useState(null);

    useEffect(
        () => autoScroll.current.scrollIntoView({behavior: "smooth"}),
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
                transports: ["websocket", "polling"],
            });
            socketRef.current.on("connect", function () {
                console.log("chat connection open");
                socketRef.current.emit('room:join', roomData['_id']);
                sendMessage("connected.");
            });
            socketRef.current.on("chat:msg", function (msg) {
                setMsgHistory((prev) => prev.concat([msg]));
                console.log("new chat msg", msg);
            });
            socketRef.current.on("close", function () {
                console.log("close");
            });
        }
    }, [roomData]);

    let chatInputRef = useRef(null);

    function sendMessage(text) {
        let msg = {
            username: userNameRef.current,
            text: text || chatInputRef.current.value
        };
        // socketRef.current.send(JSON.stringify(msg));
        console.log("sending chat msg", msg);
        socketRef.current.emit('chat:msg', msg);
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
                    placeholder="Type here..."
                />
            </div>
        </div>
    );
}

export default Chat;
