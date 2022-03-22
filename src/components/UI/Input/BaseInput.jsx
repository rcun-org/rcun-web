import React from 'react';
import classes from './BaseInput.module.scss'

const BaseInput = (props) => {
    return (
            <input {...props} className={classes.baseInput} autoComplete="off"/>
    );
};

export default BaseInput;