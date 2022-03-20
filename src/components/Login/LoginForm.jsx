import React from 'react';
import BaseInput from "../UI/Input/BaseInput";

const LoginForm = ({className}) => {
    return (
        <div className={className}>
            <BaseInput type='text' placeholder="User Name"/>
            <BaseInput type='password' placeholder="Password"/>
        </div>
    );
};

export default LoginForm;