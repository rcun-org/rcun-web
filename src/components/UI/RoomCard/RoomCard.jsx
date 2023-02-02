import React, {useContext} from 'react';
import classes from './RoomCard.module.scss';
import {useHistory} from 'react-router-dom';
import previewImage from '../../../assets/imgs/img_1.png';
import {GiPerson, GiRaccoonHead} from "react-icons/gi";
import {RoomsContext} from "../../../context";

const RoomCard = (props) => {
    let history = useHistory();

    const {performanceSwitch} = useContext(RoomsContext);

    const redirectToVideo = (event) => {
        event.stopPropagation();
        history.push(`/room/${props.room._id}`);
    };

    function prepareData(s) {
        s ||= "";
        if (s.indexOf("?v=") === -1) {
            console.log("Invalid link :c", s);
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
                backgroundImage: `url(${`https://img.youtube.com/vi/${prepareData(props.room.backupVideo)}/hqdefault.jpg`})`,
                backgroundSize: '100%',
                backgroundPosition: 'center'
            }}
        >
            <div
                className={classes.body}
            >
            </div>
            <div className={`${classes.footer} ${performanceSwitch ? classes.glassy : ''}`}>
                <div>
                    <div className={`${classes.cardTextLarge} ${classes.cardTitleMarquee}`}>
                        <div>
                            <span>{props.room.yt_video_title}</span>
                            <span>{props.room.yt_video_title}</span>
                        </div>
                    </div>
                    <div className={classes.cardTextSmall}>
                        {props.room.title}
                    </div>
                </div>
                <div>
                    <div className={classes.cardTextMedium}>
                        {/*<GiRaccoonHead/>*/}
                        {/*{props.room.audience.length}/8*/}
                        0/8
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;