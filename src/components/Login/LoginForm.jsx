import React, {useState} from 'react';
import BaseInput from "../UI/Input/BaseInput";
import {login} from "../../services/auth.service";

const LoginForm = ({className, onLogin}) => {
    const [loginData, setLoginData] = useState({
        username: '', password: ''
    })

    const handleLogin = async () => {
        //todo add client-side validation
        const loginResult = await login(loginData)

        setLoginData({
            username: '', password: ''
        })

        if (loginResult) {
            onLogin()
        }
    }
    return (
        <div className={className}>
            <BaseInput value={loginData.username}
                       onChange={(event) => setLoginData({...loginData, username: event.target.value})}
                       type='text'
                       placeholder="User Name"/>

            <BaseInput value={loginData.password}
                       onChange={(event) => setLoginData({...loginData, password: event.target.value})}
                       type='password'
                       placeholder="Password"
            />
        </div>
    );
};

export default LoginForm;