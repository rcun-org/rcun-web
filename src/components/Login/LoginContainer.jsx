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
            <div className={classes.loginContainerHead}>
                <div
                    className={authType === 'signup' ? classes.authTypeActive : ''}
                    onClick={() => setAuthType('signup')}
                >
                    SIGN UP
                </div>
                <div
                    className={authType === 'login' ? classes.authTypeActive : ''}
                    onClick={() => setAuthType('login')}
                >
                    LOG IN
                </div>
            </div>
            <div>
                {authType === 'login'
                && <LoginForm className={classes.formContainerInputList}
                              onLogin={(userToken) => onLogin(userToken)}
                />
                }
                {authType === 'signup'
                &&
                <RegistrationForm className={classes.formContainerInputList}
                                  onRegister={() => setAuthType("login")}/>
                }
            </div>

        </div>
    );
};

export default LoginContainer;