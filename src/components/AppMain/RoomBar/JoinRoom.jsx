import React, {useState} from 'react';
import InputButton from "../../UI/InputButton";
import BaseButton from "../../UI/Button/BaseButton";
import {useHistory} from "react-router-dom"

const JoinRoom = () => {
    let history = useHistory()
    let [joinBtnPushed, setJoinBtnPushed] = useState(false)

    const handleJoinBtnPush = () => {
        setJoinBtnPushed(true)
    }

    const hideJoinBtn = () => {
        setJoinBtnPushed(false)
    }

    const handleInputPush = (query) => {
        console.log('HERE')
        history.push(`/room/${query}`)
    }
    return (
        <>{joinBtnPushed ? <InputButton hideBtn={hideJoinBtn} handlePush={handleInputPush}/>
            : <BaseButton onClick={handleJoinBtnPush}>Join by room identifier</BaseButton>}
        </>
    );
};

export default JoinRoom;