import AppMain from "../pages/AppMain";
import Room from "../pages/Room";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/', component: AppMain, exact: true},
    {path: '/room/:id', component: Room, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]