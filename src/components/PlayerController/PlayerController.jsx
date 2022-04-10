import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/";
import classes from "./PlayerController.module.css";


function PlayerController(props) {
    


    return (
        <div className={classes.player_controller}>
            <div className={classes.control_buttons}>
                <button onClick={props.handleBackArrowPush}>
                    &#60;
                </button>

                <button onClick={props.handlePlayPausePush}>

                    {(props.isPaused) ? `>` : '||'}

                </button>

                <button onClick={props.handleForwardArrowPush}>
                    &#62;
                </button>
            </div>
        </div>
    );
}

export default PlayerController;
