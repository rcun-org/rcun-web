import React, {useState} from 'react';
import InputButton from "../../UI/InputButton";
import BaseButton from "../../UI/Button/BaseButton";

const JoinRoom = () => {

    let [joinBtnPushed, setJoinBtnPushed] = useState(false)

    const handleJoinBtnPush = () => {
        setJoinBtnPushed(true)
    }

    const hideJoinBtn = () => {
        setJoinBtnPushed(false)
    }

    return (
        <>{joinBtnPushed ? <InputButton hideJoinBtn={hideJoinBtn}/>
            : <BaseButton onClick={handleJoinBtnPush}>Join by room identifier</BaseButton>}
        </>
    );
};

export default JoinRoom;