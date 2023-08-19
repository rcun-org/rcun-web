import RoomBrowser from "../pages/RoomBrowser/RoomBrowser"
import Room from "../pages/Room/Room"
import Splash from "../pages/Splash"
import MovieBrowser from "../pages/MovieBrowser/MovieBrowser"

export const privateRoutes = [
  // {path: '/', component: Splash, exact: true},
  { path: "/", component: RoomBrowser, exact: true },
  { path: "/room/:id", component: Room, exact: true },
  { path: "/library", component: MovieBrowser, exact: true },
]

export const publicRoutes = [
  { path: "/login", component: Splash, exact: true },
  // {path: '/login', component: Login, exact: true},
]
