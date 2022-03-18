import AppMain from "../pages/AppMain";
import VideoPlayer from "../pages/VideoPlayer";

// export const privateroutes = [ todo after login feature done, by now all stuff will be public
//     {path: '/', component: Rooms, exact: true},
//     {path: '/video/:id', component: Video, exact: true},
// ]

export const publicRoutes = [
    // {path: '/login', component: Login, exact: true}, todo after login feature done, by now all stuff will be public
    {path: '/', component: AppMain, exact:true},
    {path: '/video/:id', component: VideoPlayer, exact:true}
]