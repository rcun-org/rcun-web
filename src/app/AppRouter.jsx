import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./router";
import { useAtom } from "jotai";
import { userDataAtom, userTokenAtom } from "@/shared/lib/stores/auth-store";

const AppRouter = () => {
  const [userToken] = useAtom(userTokenAtom);
  const [userData, setUserData] = useAtom(userDataAtom);

  // if (loading) {
  //   return <div></div>
  // }

  // const [isLoadingTokenAtom] = useAtom(isLoadingTokenAtom)
  // console.log("isLoadingTokenAtom from router:", isLoadingTokenAtom)

  return userToken ? (
    <Switch>
      {privateRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          ></Route>
        );
      })}
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
          ></Route>
        );
      })}
      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRouter;
