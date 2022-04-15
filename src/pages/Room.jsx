import React, {useEffect, useState, useRef, useContext} from 'react';
import VideoPlayer from "./VideoPlayer";
import {useParams} from 'react-router-dom';
import Chat from '../components/Chat';
import {getRoomById} from "../services/room.services";
import PlayerController from '../components/PlayerController';
import {AuthContext} from '../context';

const WS_URL = process.env["REACT_APP_WS_SERVER"];

const Room = () => {

    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);

    let {userData: {username}} = useContext(AuthContext);

    console.log(username)

    let userNameRef = useRef(username)


    useEffect(() => {
        const fetchRoomData = async () => {
            const roomData = await getRoomById(id);
            setRoomData(roomData);
        };
        fetchRoomData().catch();
    }, [])


    let socketRef = useRef(new SockJS(WS_URL + "room"));

    let [playerState, setPlayerState] = useState({
        isPaused: true,
        playerTimecode: 0,
    });


    useEffect(() => {
        socketRef.current.onopen = function () {
            console.log("open");
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);

    socketRef.current.onmessage = function (e) {
        let playerEvent = JSON.parse(e.data);

        if (playerEvent.sender !== userNameRef.current ) {
            console.log("change state from", playerState, "to", playerEvent);
            playerRef.current.seekTo( playerEvent.playerTimecode)
            setPlayerState(playerEvent);
        }
        
    };


    function broadcastChange(state) {
        state.sender = userNameRef.current
        let msg = JSON.stringify(state);
        socketRef.current.send(msg);
    }


    function handleBackArrowPush(event) {
        let currentTime = playerRef.current.getCurrentTime()
        let newState = {
            ...playerState,
            playerTimecode: currentTime - 5
        }

        setPlayerState(newState);

        broadcastChange(newState)

        playerRef.current.seekTo(currentTime - 5)

    }

    function handleForwardArrowPush(event) {
        let currentTime = playerRef.current.getCurrentTime()
        let newState = {
            ...playerState,
            playerTimecode: currentTime + 5
        }
        setPlayerState(newState);
        broadcastChange(newState)
        playerRef.current.seekTo(currentTime + 5)
        
    }

    function handlePlayPausePush(event) {
        setPlayerState({
            ...playerState,
            isPaused: !playerState.isPaused,
        });

        broadcastChange({
            ...playerState,
            isPaused: !playerState.isPaused,
        })
    }

    let playerRef = useRef()

    

    return (
        <div>
            {!roomData ?
                'loading...' :
                <div>
                    <VideoPlayer videoId={roomData.yt_video_id} isPlaying={!playerState.isPaused} forwardedRef={playerRef}/>
                    <Chat/>
                    <PlayerController
                        handlePlayPausePush={handlePlayPausePush}
                        handleForwardArrowPush={handleForwardArrowPush}
                        handleBackArrowPush={handleBackArrowPush}
                        isPaused={playerState.isPaused}

                    />
                </div>
            }
        </div>
    );
};

export default Room;