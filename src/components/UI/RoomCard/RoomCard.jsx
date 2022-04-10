import React from 'react';
import classes from './RoomCard.module.scss'
import {useHistory} from 'react-router-dom'
import previewImage from '../../../assets/imgs/img_1.png';

const RoomCard = (props) => {
    let history = useHistory()
    const redirectToVideo = () => {
        history.replace(`/room/${props.room.yt_video_id}`)
    }
    return (
        <div
            onClick={() => redirectToVideo()}
            className={classes.container}
            style={{backgroundImage: `url(${previewImage})`, backgroundSize: 'cover'}}
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
                        {props.room.audience.length} persons
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;