import React, {useContext, useEffect, useRef, useState} from "react";
import classes from "./PlayerController.module.css";
import {AiOutlinePlaySquare, AiOutlinePauseCircle, AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

function PlayerController(props) {


    return (
        <div className={classes.player_controller}>
            <div className={classes.control_buttons}>
                <button onClick={props.handleBackArrowPush}>
                    <AiOutlineArrowLeft/>
                </button>

                <button onClick={props.handlePlayPausePush}>

                    {(props.isPaused) ?
                        <AiOutlinePlaySquare/> :
                        <AiOutlinePauseCircle/>
                    }

                </button>

                <button onClick={props.handleForwardArrowPush}>
                    <AiOutlineArrowRight/>
                </button>
            </div>
        </div>
    );
}

export default PlayerController;
