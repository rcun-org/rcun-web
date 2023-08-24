import { BrowserRouter } from "react-router-dom"
import { AuthContext, ConnectionContext } from "./context"
import { useEffect, useState, useMemo, Suspense } from "react"
import AppRouter from "./components/AppRouter"

import AppLayout from "./components/AppLayout/AppLayout"
import {
  getCurrentUserToken,
  getLocalCurrentUserToken,
} from "./services/auth.service"

import "./styles/index.scss"
import { getUser } from "./services/api.user_service"
import { getRooms } from "./services/room.services"

import { Provider as JotaiProvider, useAtom } from "jotai"
import { roomsAtom } from "./stores/room-store"
import Splash from "./pages/Splash"
// import SplashContainer from "./components/Splash/SplashContainer"

// import {
//   isLoadingTokenAtom,
//   userDataAtom,
//   userTokenAtom,
// } from "./stores/auth-store"

const App = () => {
  // const [, setUserToken] = useAtom(userTokenAtom)
  // const [, setUserData] = useAtom(userDataAtom)
  // const [, setLoading] = useAtom(isLoadingTokenAtom)

  // async function bootApp() {
  //   setLoading(true)
  //   const userToken = getLocalCurrentUserToken()
  //   setUserToken(userToken)
  //   if (userToken) {
  //     const userData = await getUser()
  //     setUserData(userData.data)
  //   }
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   bootApp().catch()
  // }, [])
  return (
    <JotaiProvider>
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={Splash}>
            <AppRouter />
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </JotaiProvider>
  )
}

export default App
