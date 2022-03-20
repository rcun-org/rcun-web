import React from 'react';
import classes from './BaseButton.module.scss'

const BaseButton = (props) => {
    return (
        <button {...props} className={classes.baseButton}/>
    );
};

export default BaseButton;