import React from 'react';
import classes from './BaseInput.module.scss'

const BaseInput = (props) => {
    return (
        <input
            {...props}
            className={`${classes.baseInput} ${props.isFancy && classes.fancy}`}
            autoComplete="off"
        />
    );
};

export default BaseInput;