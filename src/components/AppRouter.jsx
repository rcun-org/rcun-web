import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {publicRoutes} from "../router";

const AppRouter = () => {
    return (
        <Switch>
            {publicRoutes.map(route => {
                return (
                    <Route path={route.path} component={route.component} exact={route.exact} key={route.path}>
                    </Route>
                )
            })}
        </Switch>
    );
};

export default AppRouter;