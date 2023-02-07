import React, {useState} from 'react';
import BaseInput from "../UI/Input/BaseInput";
import {login} from "../../services/auth.service";
import BaseButton from "../UI/Button/BaseButton";
import classes from './Login.module.scss'

const LoginForm = ({className, onLogin}) => {
    const [loginData, setLoginData] = useState({
        username: '', password: ''
    })

    const handleLogin = async () => {
        // todo add client-side validation
        const userToken = await login(loginData)

        setLoginData({
            username: '', password: ''
        })

        if (userToken) {
            onLogin(userToken)
        }
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }

    return (
        <div className={className}>
            <div className={classes.loginText}>
                We know you?
            </div>

            <BaseInput
                isFancy={true}
                value={loginData.username}
                onKeyUp={handleKeyUp}
                onChange={(event) => setLoginData({...loginData, username: event.target.value})}
                type='text'
                placeholder="Username"/>

            <BaseInput
                isFancy={true}
                value={loginData.password}
                onChange={(event) => setLoginData({...loginData, password: event.target.value})}
                onKeyUp={handleKeyUp}
                type='password'
                placeholder="Password"
            />

            {/*<BaseButton onClick={handleLogin}>Continue</BaseButton>*/}
        </div>
    );
};

export default LoginForm;