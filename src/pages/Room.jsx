import React, {useEffect, useState, useRef} from 'react';
import VideoPlayer from "./VideoPlayer";
import {useParams} from 'react-router-dom'
import Chat from '../components/Chat'
import {getRoomById} from "../services/room.services";
import PlayerController from '../components/PlayerController';
const WS_URL = process.env["REACT_APP_WS_SERVER"];

const Room = () => {

    const {id} = useParams()
    const [roomData, setRoomData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchRoomData = async () => {
            setLoading(true)
            const roomData = await getRoomById(id)
            setRoomData(roomData)
            setLoading(false)
        }
        fetchRoomData().catch()

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

        socketRef.current.onmessage = function (e) {
            let playerEvent = e.data;
            console.log("player event data received", e.data);
            //setPlayerState((prev) => playerEvent);
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);

    function sendPlayerEvent() {
        let msg = playerState;
        socketRef.current.send(msg);
    }

    function handleBackArrowPush(event) {
        setPlayerState(prev => {
            return {
                ...prev,
                playerTimecode: (prev.playerTimecode - 5 < 0) ? 0 : prev.playerTimecode - 5
            };
        });
        sendPlayerEvent();
    }

    function handleForwardArrowPush(event) {
        setPlayerState(prev => {
            return {
                ...prev,
                playerTimecode: prev.playerTimecode + 5
            };
        });
        sendPlayerEvent();
    }

    function handlePlayPausePush(event) {
        setPlayerState(prev => {
            return {
                ...prev,
                isPaused: !prev.isPaused
            };
        });
        sendPlayerEvent();
    }





    return (
        <div>
            {loading ?
                'loading...' :
                <div>
                    <VideoPlayer videoId={roomData.yt_video_id} isPlaying={!playerState.isPaused}/>
                    <Chat/>
                    <PlayerController handlePlayPausePush={handlePlayPausePush} handleForwardArrowPush={handleForwardArrowPush} handleBackArrowPush={handleBackArrowPush} isPaused={playerState.isPaused}/>
                </div>
            }
        </div>
    );
};

export default Room;