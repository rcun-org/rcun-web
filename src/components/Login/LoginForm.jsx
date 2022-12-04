import React, {useState} from 'react';
import BaseInput from "../UI/Input/BaseInput";
import {login} from "../../services/auth.service";
import BaseButton from "../UI/Button/BaseButton";

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
    return (
        <div className={className}>
            <BaseInput value={loginData.username}
                       onChange={(event) => setLoginData({...loginData, username: event.target.value})}
                       type='text'
                       placeholder="Username"/>

            <BaseInput value={loginData.password}
                       onChange={(event) => setLoginData({...loginData, password: event.target.value})}
                       type='password'
                       placeholder="Password"
            />
            <BaseButton onClick={handleLogin}>Login</BaseButton>
        </div>
    );
};

export default LoginForm;