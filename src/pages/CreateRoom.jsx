import React from 'react';
import classes from "../components/Login/Login.module.scss";
import loginBg from "../assets/imgs/login-bg.jpg";
import CreateRoomForm from "../components/CreateRoom/CreateRoomForm";



const CreateRoom = () => {
    const containerStyle =  {
        backgroundImage: `linear-gradient(to bottom, rgba(150, 150, 150, 0.2), rgba(243, 243, 243, 0.2)), url(${loginBg})`,
        backgroundSize: 'cover',
    }
    return (
        <div >
            <div className={classes.container} style={containerStyle}>

                <div className = {classes.formContainer}>
                    <div className={classes.loginContainerHead}>New room</div>
                    <CreateRoomForm className={classes.formContainerInputList}/>
                </div>

            </div>
        </div>
    );
};

export default CreateRoom;