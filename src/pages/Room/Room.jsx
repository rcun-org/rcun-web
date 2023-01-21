import React, {useEffect, useState, useRef, useContext} from 'react';
import VideoPlayer from "../VideoPlayer";
import {useParams} from 'react-router-dom';
import Chat from '../../components/Chat';
import {getRoomById} from "../../services/room.services";
import PlayerController from '../../components/PlayerController';
import {AuthContext} from '../../context';

import classes from './room.module.scss';
import {io} from "socket.io-client";

const WS_URL = process.env["REACT_APP_WS_SERVER"];
const ALLOWED_DELAY = 3;

const Room = () => {
    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);
    let {userData: {username}} = useContext(AuthContext);
    let userNameRef = useRef(username);

    // ws connection
    let socketRef = useRef(0);

    // get room from api
    useEffect(() => {
        const fetchRoomData = async () => {
            let rd = await getRoomById(id)
            setRoomData(rd);
        };
        fetchRoomData().catch();
    }, []);

    // ws
    useEffect(() => {
        console.log("effect 2!")
        if (!!roomData) {
            console.log("roomData not null", roomData)
            // establish connection
            socketRef.current = new io(WS_URL, {
                transports: ["polling", "websocket"],
            })
            // socketRef.current = new io(WS_URL, {
            //     transports: ["websocket", "polling"],
            // })

            // ws hooks
            socketRef.current.on("connect", function () {
                console.log("on connect")
                console.log("room data", roomData)
                socketRef.current.emit('room:join', roomData['_id']);
            });
            socketRef.current.on("close", function () {
                console.log('close');
            });
            socketRef.current.on("connect_error", () => {
                socketRef.current.io.opts.transports = ["polling", "websocket"];
            });

            // on receive event
            socketRef.current.on('player:event', function (e) {
                console.log("received socket msg", JSON.parse(e));

                let playerEventChange = JSON.parse(e);

                // if (playerEventChange.sender !== userNameRef.current) {
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
                // }
            });
        }
    }, [roomData])

    // player state
    let [playerState, setPlayerState] = useState({
        isPaused: true,
        playerTimecode: 0,
    });

    // send function
    function broadcastChange(change) {
        change.sender = userNameRef.current;
        let msg = JSON.stringify(change);
        console.log("SENT socket msg", JSON.parse(msg));
        socketRef.current.emit('player:event', msg, roomData['_id']);
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
                    {/*<Chat/>*/}
                </div>
            }
        </div>
    );
};

export default Room;