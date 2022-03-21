import React from 'react';
import BaseInput from "../UI/Input/BaseInput";
import GoogleLogin from "react-google-login";

const LoginForm = ({className}) => {
    // const handleLogin = (result) => {
    //     console.log(result)
    // }
    // const handleFailure = (success) => {
    //     console.log(success)
    // }
    return (
        <div className={className}>
            <BaseInput type='text' placeholder="User Name"/>
            <BaseInput type='password' placeholder="Password"/>
        </div>
    );
};

export default LoginForm;