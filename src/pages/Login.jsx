import React from 'react';
import LoginContainer from "../components/Login/LoginContainer";
import classes from "../components/Login/Login.module.scss";
import loginBg from "../assets/imgs/logo.svg";
import LoginAppPreview from "../components/Login/LoginAppPreview";

const Login = () => {
    const containerStyle = {
        // backgroundImage: `linear-gradient(to bottom, $dark-grey, $dark-grey)`, // , url(${loginBg})
        backgroundSize: 'cover'
    }
    return (
        <div className={classes.container} style={containerStyle}>
            <LoginContainer className={classes.formContainer}/>
            <LoginAppPreview className={classes.appTitleContainer}/>
        </div>
    );
};

export default Login;