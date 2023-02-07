import React, {useContext, useState} from 'react';
import classes from './Login.module.scss'
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {AuthContext} from "../../context";
import {getUser} from "../../services/api.user_service";


const LoginContainer = (props) => {
    const [authType, setAuthType] = useState('login')
    const {setUserToken, setUserData} = useContext(AuthContext)

    const onLogin = async (userToken) => {
        setUserToken(userToken)
        if (userToken) {
            const userData = await getUser()
            setUserData(userData.data)
        }
    }
    return (
        <div className={props.className}>
            <div className={classes.appTitleContainer}>
                {/*RCUN*/}
            </div>

            <LoginForm
                className={classes.formContainerInputList}
                onLogin={(userToken) => onLogin(userToken)}
            />
        </div>
    );
};

export default LoginContainer;