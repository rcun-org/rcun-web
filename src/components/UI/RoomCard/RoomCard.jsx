import React from 'react';
import classes from './RoomCard.module.scss'

import previewImage from '../../../assets/imgs/img_1.png';

const RoomCard = (props) => {
    return (
        <div className={classes.container} style={{backgroundImage: `url(${previewImage})`, backgroundSize: 'cover'}}>
            <div
                className={classes.body}
            >
            </div>
            <div className={classes.footer}>
                <div>
                    <div className={classes.cardTextLarge}>
                        Video 1
                    </div>
                    <div className={classes.cardTextSmall}>
                        Room 1
                    </div>
                </div>
                <div>
                    <div className={classes.cardTextMedium}>
                        3 persons
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;