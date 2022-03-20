import React from 'react';
import BaseInput from "../UI/Input/BaseInput";

const RegistrationForm = ({className}) => {
    return (
        <div className={className}>
            <BaseInput type='text' placeholder="User Name"/>
            <BaseInput type='text' placeholder="Email"/>
            <BaseInput type='password' placeholder="Password"/>
            <BaseInput type='password' placeholder="Confirm Password"/>

        </div>
    );
};

export default RegistrationForm;