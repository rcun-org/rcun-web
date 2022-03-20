import React from 'react';
import classes from './BaseInput.module.scss'

const BaseInput = (props) => {
    return (
        <form>
            <input {...props} className={classes.baseInput} autoComplete="off"/>
        </form>
    );
};

export default BaseInput;