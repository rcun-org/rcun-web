import React, {useContext} from 'react';
import BaseButton from "../UI/Button/BaseButton";
import {logout} from "../../services/auth.service";
import {AuthContext} from "../../context";

const Logout = () => {
    const {setUserToken} = useContext(AuthContext)
    return (
        <div>
            <BaseButton onClick={() => {
                logout()
                setUserToken(null)
            }
            }>
                Logout
            </BaseButton>
        </div>
    );
};

export default Logout;