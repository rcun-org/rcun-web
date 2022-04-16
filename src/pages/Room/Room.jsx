import React, {useEffect, useState, useRef, useContext} from 'react';
import VideoPlayer from "../VideoPlayer";
import {useParams, useHistory} from 'react-router-dom';
import Chat from '../../components/Chat';
import {getRoomById} from "../../services/room.services";
import PlayerController from '../../components/PlayerController';
import {AuthContext} from '../../context';

import classes from './room.module.scss';
import BaseButton from "../../components/UI/Button/BaseButton";

const WS_URL = process.env["REACT_APP_WS_SERVER"];
const ALLOWED_DELAY = 3;

const Room = () => {

    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);

    let {userData: {username}} = useContext(AuthContext);

    let history = useHistory();

    let userNameRef = useRef(username);


    // fetch room information
    useEffect(() => {
        const fetchRoomData = async () => {
            const roomData = await getRoomById(id);
            setRoomData(roomData);
        };
        fetchRoomData().catch();
    }, []);


    // establish ws connection
    let socketRef = useRef(new SockJS(WS_URL + "room"));

    // player state
    let [playerState, setPlayerState] = useState({
        isPaused: true,
        playerTimecode: 0,
    });


    // ws hooks
    useEffect(() => {
        socketRef.current.onopen = function () {
            console.log("open");
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);


    // on receive event
    socketRef.current.onmessage = function (e) {
        let playerEventChange = JSON.parse(e.data);

        if (playerEventChange.sender !== userNameRef.current) {
            let newState = playerState;
            for (let k in playerEventChange) {
                newState[k] = playerEventChange[k];
            }
            console.log("change state from", playerState, "to", newState);
            if (Math.abs(playerState.playerTimecode - newState.playerTimecode) > ALLOWED_DELAY) {
                playerRef.current.seekTo(newState.playerTimecode);
            }
            setPlayerState(newState);
        }
    };

    // send function
    function broadcastChange(change) {
        change.sender = userNameRef.current;
        let msg = JSON.stringify(change);
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
                <h3 style={{color: 'white'}}>loading...</h3> :
                <div>
                    <VideoPlayer videoId={roomData.yt_video_id} isPlaying={!playerState.isPaused}
                                 forwardedRef={playerRef}/>
                    <PlayerController
                        handlePlayPausePush={handlePlayPausePush}
                        handleForwardArrowPush={handleForwardArrowPush}
                        handleBackArrowPush={handleBackArrowPush}
                        isPaused={playerState.isPaused}

                    />
                    <BaseButton
                        style={{width: '100px', fontSize: '12px', marginTop: '8px'}}
                        onClick={() => history.push('/')}
                    >
                        Back
                    </BaseButton>
                    <Chat/>

                </div>
            }
        </div>
    );
};

export default Room;