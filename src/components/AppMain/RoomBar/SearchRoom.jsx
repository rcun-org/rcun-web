import React, {useState} from 'react';
import InputButton from "../../UI/InputButton";
import BaseButton from "../../UI/Button/BaseButton";

const SearchRoom = () => {
    let [searchBtnPushed, setSearchBtnPushed] = useState(false)

    const searchBtnPush = () => {
        setSearchBtnPushed(true)
    }

    const hideSearchBtn = () => {
        setSearchBtnPushed(false)
    }

    return (
        <>
            {searchBtnPushed ? <InputButton hideBtn={hideSearchBtn}
                                            handlePush={(query)=>console.log(query)}/>
                : <BaseButton onClick={searchBtnPush}>Search room</BaseButton>
            }
        </>
    );
};

export default SearchRoom;