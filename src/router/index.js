import AppMain from "../pages/AppMain";
import Room from "../pages/Room";
import Login from "../pages/Login";
import CreateRoom from "../pages/CreateRoom";

export const privateRoutes = [
    {path: '/', component: AppMain, exact: true},
    {path: '/room/:id', component: Room, exact: true},
    {path: '/new_room', component: CreateRoom, exact: true}
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]