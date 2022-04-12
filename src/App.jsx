import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";

import AppLayout from "./components/AppLayout/AppLayout";
import {getCurrentUserToken} from "./services/auth.service";

import './styles/index.scss'
import {getUser} from "./services/api.user_service";


const App = () => {
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setUserToken(getCurrentUserToken())
        setUserData(getUser())
        setLoading(false)
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