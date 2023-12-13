import { BrowserRouter } from "react-router-dom";
// import { AuthContext } from "@/shared/lib/context";
import { Suspense } from "react";
import AppRouter from "./AppRouter";

import AppLayout from "@/components/AppLayout/AppLayout";
// import { getLocalCurrentUserToken } from "@/shared/services/auth.service";
//
// import { getUser } from "@/shared/services/api.user_service";
// import { getRooms } from "@/shared/services/room.services";
//
// import { roomsAtom } from "@/shared/lib/stores/room-store";

import { Provider as JotaiProvider } from "jotai";
import Splash from "@/pages/Splash";

import "@/shared/styles/index.scss";
import "@/shared/styles/globalVars.scss";
// import SplashContainer from "./components/Splash/SplashContainer"

// import {
//   isLoadingTokenAtom,
//   userDataAtom,
//   userTokenAtom,
// } from "./stores/auth-store"

const App = () => {
  console.log("Build v1");

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
  );
};

export default App;
