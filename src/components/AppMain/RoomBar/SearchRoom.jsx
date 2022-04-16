import React, {useContext, useState} from 'react';
import InputButton from "../../UI/InputButton";
import BaseButton from "../../UI/Button/BaseButton";
import {RoomsContext} from "../../../context";

const SearchRoom = () => {
    let [searchBtnPushed, setSearchBtnPushed] = useState(false)
    const {setRoomSearch} = useContext(RoomsContext)

    const searchBtnPush = () => {
        setSearchBtnPushed(true)
    }

    const hideSearchBtn = () => {
        setSearchBtnPushed(false)
    }

    return (
        <>
            {searchBtnPushed ? <InputButton hideBtn={hideSearchBtn}
                                            handlePush={(query)=>setRoomSearch(query)}
                />
                : <BaseButton onClick={searchBtnPush}>Search room</BaseButton>
            }
        </>
    );
};

export default SearchRoom;