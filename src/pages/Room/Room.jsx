import React, {useEffect, useState, useRef, useContext} from 'react';
import VideoPlayer from "../VideoPlayer";
import {useParams} from 'react-router-dom';
import Chat from '../../components/Chat';
import {getRoomById} from "../../services/room.services";
import PlayerController from '../../components/PlayerController';
import {AuthContext} from '../../context';

import classes from './room.module.scss';
import BaseButton from "../../components/UI/Button/BaseButton";
import AppHeader from "../../components/AppLayout/AppHeader";
import {io} from "socket.io-client";

const WS_URL = process.env["REACT_APP_WS_SERVER"];
const ALLOWED_DELAY = 3;

const Room = () => {
    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);
    let {userData: {username}} = useContext(AuthContext);
    let userNameRef = useRef(username);

    // fetch room information
    useEffect(() => {
        const fetchRoomData = async () => {
            const roomData = await getRoomById(id);
            setRoomData(roomData);
        };
        fetchRoomData().catch();
    }, []);

    // player state
    let [playerState, setPlayerState] = useState({
        isPaused: true,
        playerTimecode: 0,
    });

    // establish ws connection

    let socketRef = useRef(new io('localhost:5001/ws', {
        transports: ["websocket", "polling"],
    }));

    // ws hooks
    useEffect(() => {
        socketRef.current.on("connect_error", () => {
            // default upgrading scheme
            socketRef.current.io.opts.transports = ["polling", "websocket"];
        });

        socketRef.current.on("connect", function () {
            r = Math.random() > 0.5 ? 1 : 2;
            console.log('open room:', r);
            socketRef.current.emit('room:join', r);
            socketRef.current.emit('chat:msg', 'i connected', r);
        });

        socketRef.current.on("chat:msg", function (msg) {
            console.log('chat:msg', msg);
        });

        socketRef.current.on("close", function () {
            console.log('close');
        });
    }, []);


    // on receive event
    socketRef.current.on('room:event', function (e) {
        console.log("received socket msg", JSON.parse(e.data));

        let playerEventChange = JSON.parse(e.data);

        if (playerEventChange.sender !== userNameRef.current) {
            let newState = playerState;
            for (let k in playerEventChange) {
                if (k !== "sender") {
                    newState[k] = playerEventChange[k];
                }
            }

            if (Math.abs(playerRef.current.getCurrentTime() - newState.playerTimecode) > ALLOWED_DELAY) {
                playerRef.current.seekTo(newState.playerTimecode);
            }
            setPlayerState({...newState});
        }
    });

    // send function
    function broadcastChange(change) {
        change.sender = userNameRef.current;
        let msg = JSON.stringify(change);
        console.log("SENT socket msg", JSON.parse(msg));
        socketRef.current.send(msg);
    }

    // button handlers
    function handleBackArrowPush(event) {
        let currentTime = playerRef.current.getCurrentTime();
        let change = {
            playerTimecode: currentTime - 5,
        };
        let newState = {
            ...playerState,
            ...change,
        };
        setPlayerState(newState);
        broadcastChange(change);
        playerRef.current.seekTo(currentTime - 5); // perform action
    }

    function handleForwardArrowPush(event) {
        let currentTime = playerRef.current.getCurrentTime();
        let change = {
            playerTimecode: currentTime + 5,
        };
        let newState = {
            ...playerState,
            ...change,
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
            ...change,
        };
        setPlayerState(newState);
        broadcastChange(change);
    }

    let playerRef = useRef();

    // ui
    return (
        <div className={classes.container}>
            {!roomData ?
                <h3 style={{color: 'white'}}></h3> :
                <div style={{height: '100%'}}>
                    <div className={classes.video_and_player}>
                        <VideoPlayer videoId={roomData.yt_video_id} isPlaying={!playerState.isPaused}
                                     forwardedRef={playerRef}/>

                        <PlayerController
                            handlePlayPausePush={handlePlayPausePush}
                            handleForwardArrowPush={handleForwardArrowPush}
                            handleBackArrowPush={handleBackArrowPush}
                            isPaused={playerState.isPaused}
                        />
                    </div>
                    <Chat/>
                </div>
            }
        </div>
    );
};

export default Room;