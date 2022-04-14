import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";

import AppLayout from "./components/AppLayout/AppLayout";
import {getCurrentUserToken} from "./services/auth.service";

import './styles/index.scss'
import {getUser} from "./services/api.user_service";
import {getRooms} from "./services/room.services";


const App = () => {
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    async function bootApp() {
        setLoading(true)
        const userToken = await getCurrentUserToken()
        setUserToken(userToken)
        if (userToken) {
            const userData = await getUser()
            setUserData(userData.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        bootApp().catch()
    }, [])
    return (
        <AuthContext.Provider value={{
            userToken,
            setUserToken,
            loading,
            userData
        }}>
            <BrowserRouter>
                <AppLayout>
                    <AppRouter/>
                </AppLayout>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App