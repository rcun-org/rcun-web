import RoomBrowser from "../pages/RoomBrowser";
import Room from "../pages/Room/Room";
import Login from "../pages/Login";
import Splash from "../pages/Splash";

export const privateRoutes = [
    // {path: '/', component: Splash, exact: true},
    {path: '/', component: RoomBrowser, exact: true},
    {path: '/room/:id', component: Room, exact: true},
    // {path: '/new_room', component: CreateRoom, exact: true}
]

export const publicRoutes = [
    {path: '/login', component: Splash, exact: true},
    // {path: '/login', component: Login, exact: true},
]