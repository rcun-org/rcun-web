import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import BaseButton from "../../UI/Button/BaseButton";
import BaseModal from "../../UI/Modal/BaseModal";
import CreateRoomForm from "../../CreateRoom/CreateRoomForm";
import classes from "../../Login/Login.module.scss";
import RedirectToRoomConfirm from "../../CreateRoom/RedirectToRoomConfirm";

const CreateRoom = () => {
    const history = useHistory()
    const [modalActive, setModalActive] = useState(false)
    const [roomCreatedId, setRoomCreatedId] = useState(null)
    const redirectToVideo = () => {
        history.push(`/room/${roomCreatedId}`)
    }
    useEffect(() => {
        setRoomCreatedId(null)
    }, [modalActive])
    return (
        <>
            <BaseButton onClick={() => setModalActive(true)}>Create a new room</BaseButton>
            <BaseModal active={modalActive} setActive={setModalActive}>
                <div className={classes.loginContainerHead}>
                    Create new Room
                </div>
                {
                    !roomCreatedId ?
                        <CreateRoomForm roomCreated={(roomId) => setRoomCreatedId(roomId)}/>
                        :
                        <RedirectToRoomConfirm confirmed={() => {
                            redirectToVideo()
                        }}/>
                }
            </BaseModal>
        </>
    );
};

export default CreateRoom;