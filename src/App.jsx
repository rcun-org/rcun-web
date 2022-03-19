import {BrowserRouter} from "react-router-dom";


import AppLayout from "./components/AppLayout/AppLayout";
import './styles/index.scss'
import AppRouter from "./components/AppRouter";

const App = () => {
    
    return (
        <BrowserRouter>
            <AppLayout>
                <AppRouter/>
            </AppLayout>
        </BrowserRouter>
    )
}

export default App