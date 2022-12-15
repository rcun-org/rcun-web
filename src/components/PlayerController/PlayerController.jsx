import React, {useContext, useEffect, useRef, useState} from "react";
import classes from "./PlayerController.module.scss";
import {AiOutlinePlaySquare, AiOutlinePauseCircle, AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {faPause} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import BaseButton from "../UI/Button/BaseButton";
import {useHistory} from "react-router-dom";

function PlayerController(props) {
    let history = useHistory();

    return (
        <div className={classes.player_controller}>
            <div className={classes.side_controls}>
                <button
                    onClick={() => history.push('/')}
                >
                    <FontAwesomeIcon icon={faLeftLong}/>
                </button>
            </div>

            <div className={classes.control_buttons}>
                <button
                    onClick={props.handleBackArrowPush}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </button>

                <button onClick={props.handlePlayPausePush}>
                    {(props.isPaused) ?
                        <FontAwesomeIcon icon={faPlay} size={"lg"}/> :
                        <FontAwesomeIcon icon={faPause} size={"xl"}/>
                    }
                </button>

                <button onClick={props.handleForwardArrowPush}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </div>
        </div>
    );
}

export default PlayerController;
