import React, {useState} from 'react';
import BaseButton from "../../UI/Button/BaseButton";
import BaseModal from "../../UI/Modal/BaseModal";
import CreateRoomForm from "../../CreateRoom/CreateRoomForm";
import classes from "../../Login/Login.module.scss";
import {createRoom} from "../../../services/room.services";

const CreateRoom = () => {
    const [modalActive, setModalActive] = useState(false)
    return (
        <>
            <BaseButton onClick={() => setModalActive(true)}>Create a new room</BaseButton>
            <BaseModal active={modalActive} setActive={setModalActive}>
                <div className={classes.loginContainerHead}>
                    Create new Room
                </div>
                <CreateRoomForm roomCreated={() => setModalActive(false)}/>
            </BaseModal>
        </>
    );
};

export default CreateRoom;