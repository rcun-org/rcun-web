import React from 'react';
import classes from './RoomCard.module.scss'
import {useHistory} from 'react-router-dom'
import previewImage from '../../../assets/imgs/img_1.png';
import {GiPerson, GiRaccoonHead} from "react-icons/gi";

const RoomCard = (props) => {
    let history = useHistory()
    const redirectToVideo = (event) => {
        event.stopPropagation()
        history.push(`/room/${props.room._id}`)
    }

    function prepareData(s) {
        if (s.indexOf("?v=") === -1) {
            alert("Invalid link :c");
            return "";
        }
        s = s.substring(s.indexOf("?v=") + 3);
        s = s.split('&')[0];
        return s;
    }

    return (
        <div
            onClick={(e) => redirectToVideo(e)}
            className={classes.container}
            style={{
                backgroundImage: `url(${`https://img.youtube.com/vi/${prepareData(props.room.yt_video_id)}/sddefault.jpg`})`,
                backgroundSize: '100%',
                backgroundPosition: 'center'
            }}
        >
            <div
                className={classes.body}
            >
            </div>
            <div className={classes.footer}>
                <div>
                    <div className={classes.cardTextLarge}>
                        {props.room.title}
                    </div>
                    <div className={classes.cardTextSmall}>
                        Room {props.index + 1}
                    </div>
                </div>
                <div>
                    <div className={classes.cardTextMedium}>
                        {/*<GiRaccoonHead/> */}
                        {props.room.audience.length}/8
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;