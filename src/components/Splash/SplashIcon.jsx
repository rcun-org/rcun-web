import React from 'react';
import classes from './Splash.module.scss';

const SplashIcon = () => {
    return (
        <svg className={classes.splashIconDesign} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.35 290.42" width="80" height="80">
            <path
                className={classes.splashIconEyeLightning}
                d="M56.75 156.63c.25 14.37 21.61 14.37 21.86 0-.25-14.36-21.61-14.36-21.86 0Z"
            />
            <path
                className={classes.splashIconHeadPath}
                d="M217.06 170.18c-12.32 16.79-26.68 36.64-49 39-26.16 4.1-49.58 13.46-72.44 26.54-10.11 6.33-22 9.43-33.81 6.51-16.9-4.1-54.4 11.2-56.81-14.73a.71.71 0 0 1 .17-.5C63.46 163.41 18.81 148.58 49 102.34c36.37-34.02 60.69-64.14 108-78.83 11.51-9.63 25.68-13.66 39.37-5.8A125.85 125.85 0 0 0 242.62 5a.22.22 0 0 1 .32.2c.45 13.2-.3 27.36-5.54 39.74a.17.17 0 0 0 .11.22C245.6 46.75 267 36.77 274.05 31a.46.46 0 0 1 .75.45 139.83 139.83 0 0 1-9.42 27.89 1.35 1.35 0 0 0 .34 1.58c7.89 6.84 15.67 13.36 18.51 24"
            />
            <path
                className={classes.splashIconSmallElementsPath}
                d="m81.68 223.97-18 18.53M173.85 284c4.7-24.95 4.56-51.19-5.82-74.8
                M110.11 47.06c.09-13.3 3.89-27.14 12.24-37.71C128.53 3.5 139.2 24.77 142.1 29M67 107.89c9.9-6 21.93 3.47 29.41 9.75
                M19.85 207.49c5.91 11.16 10.18 22.82 8.4 35.59
                M37 174.63c10.8 7.5 21.32 18.54 33.22 24.26 29.17 12.74 96.85-19.56 73.27-57.09-2.85-7-7.67-3.56-13.43-2.07-7 1.82-14.07 3.33-21.31 3.38-36.87-5.32-30.09-38.42-70.89 4.13
                M175.3 92.56c73.59-42.62 6.32-133.33-42.11-35.95
                M155.28 70c4.28-21.38 13.48-41 29.13-56.47"
            />
            <path
                className={classes.splashIconEyePath}
                d="M56.75 156.63c.25 14.37 21.61 14.37 21.86 0-.25-14.36-21.61-14.36-21.86 0Z"
            />
        </svg>
    );
};

export default SplashIcon;
