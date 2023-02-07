import React, {useState} from 'react';
import InputButton from "../../UI/InputButton";
import BaseButton from "../../UI/Button/BaseButton";
import {useHistory} from "react-router-dom"
import BaseInput from "../../UI/Input/BaseInput";
import classes from '../../UI/Input/BaseInput.module.scss';

const JoinRoom = () => {
    let history = useHistory()

    const [inputValue, setInputValue] = useState("")

    const onInput = (query) => {
        history.push(`/room/${query}`)
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            onInput(inputValue)
        }
    }

    return (
        <BaseInput
            isFancy={true}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            type='text'
            placeholder="Join by room id"/>
    );
};

export default JoinRoom;