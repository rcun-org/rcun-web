import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";

const AppRouter = () => {
    //...........................................................................................//
    const {userToken, loading} = useContext(AuthContext)
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        userToken ?
            <Switch>
                {privateRoutes.map(route => {
                    return (
                        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}>
                        </Route>
                    )
                })
                }
                <Redirect to='/'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route => {
                    return (
                        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}>
                        </Route>
                    )
                })
                }
                <Redirect to='/login'/>
            </Switch>
    );
};

export default AppRouter;