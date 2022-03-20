import React, {useState} from 'react';
import classes from './Login.module.scss'
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";


const LoginContainer = (props) => {
    const [authType, setAuthType] = useState('login')
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
                && <LoginForm className={classes.formContainerInputList}/>
                }
                {authType === 'signup'
                && <RegistrationForm className={classes.formContainerInputList}/>
                }
            </div>

        </div>
    );
};

export default LoginContainer;