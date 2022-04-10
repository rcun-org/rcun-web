import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/";
import classes from "./PlayerController.module.css";

const WS_URL = process.env["REACT_APP_WS_SERVER"]

function PlayerController(props) {
    let socketRef = useRef(new SockJS(WS_URL + "room"));

    let [playerState, setPlayerState] = useState({
        isPaused: true,
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


    



    function handleBackArrowPush(event){
        setPlayerState(prev => {return {
            ...prev,
            playerTimecode:(prev.playerTimecode - 5 < 0)? 0:prev.playerTimecode - 5
        }})
    }

    function handleForwardArrowPush(event){
        setPlayerState(prev => {return {
            ...prev,
            playerTimecode:prev.playerTimecode + 5
        }})
    }

    function handlePlayPausePush(event){
        setPlayerState(prev => {
            return {
                ...prev,
                isPaused:!prev.isPaused
            }
        })
    }


    



    return (
        <div className={classes.player_controller}>
            <div className={classes.control_buttons}>
                <button onClick={handleBackArrowPush}>
                 &#60;
                </button>

                <button onClick={handlePlayPausePush}>
                    
                  {(playerState.isPaused)? `>`: '||'}
                  
                </button>

                <button onClick={handleForwardArrowPush}>
                 &#62;
                </button>
            </div>
        </div>
    );
}

export default PlayerController;
