import React, {useEffect, useState, useRef} from 'react';
import VideoPlayer from "./VideoPlayer";
import {useParams} from 'react-router-dom';
import Chat from '../components/Chat';
import {getRoomById} from "../services/room.services";
import PlayerController from '../components/PlayerController';

const WS_URL = process.env["REACT_APP_WS_SERVER"];

const Room = () => {

    const {id} = useParams();
    const [roomData, setRoomData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRoomData = async () => {
            setLoading(true);
            const roomData = await getRoomById(id);
            setRoomData(roomData);
            setLoading(false);
        };
        fetchRoomData().catch();

    }, []);

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
            let playerEvent = JSON.parse(e.data);
            if (playerEvent.isPaused !== playerState.isPaused) {
                console.log("change state from", playerState, "to", playerEvent);
                setPlayerState(prev => playerEvent);
                setTimeout(() => console.log("new player state:", playerState), 1000);
            }
        };

        socketRef.current.onclose = function () {
            console.log("close");
        };
    }, []);

    function sendPlayerEvent(playerEvent) {
        setPlayerState(prev => playerEvent);
        setTimeout(() => console.log("new player state:", playerState), 1000);
        let msg = JSON.stringify(playerEvent);
        socketRef.current.send(msg);
    }

    function handleBackArrowPush(event) {
        sendPlayerEvent({
            ...playerState,
            playerTimecode: playerState.playerTimecode - 5
        });
    }

    function handleForwardArrowPush(event) {
        sendPlayerEvent({
            ...playerState,
            playerTimecode: playerState.playerTimecode + 5
        });
    }

    function handlePlayPausePush(event) {
        sendPlayerEvent({
            ...playerState,
            isPaused: !playerState.isPaused,
        });
    }


    return (
        <div>
            {loading ?
                'loading...' :
                <div>
                    <VideoPlayer videoId={roomData.yt_video_id} isPlaying={!playerState.isPaused}/>
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