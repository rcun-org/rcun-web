import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";

import AppLayout from "./components/AppLayout/AppLayout";
import {getCurrentUserToken} from "./services/auth.service";

import './styles/index.scss'


const App = () => {
    const [userToken, setUserToken] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setUserToken(getCurrentUserToken())
        setLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{
            userToken,
            setUserToken,
            loading
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