import {useState} from "react";
import {useAtom} from "jotai/index";
import {languageMode} from "../../stores/language-store";

const useLanguageSwitch = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [language, setLanguage] = useAtom(languageMode);
    // const lang = localStorage.getItem("lng");

    const isActive = (lang) => {
        if (language === lang ) {
            return {
                background: '#5d5d5d',
                color: '#FFF'
            }
        }
        return{
            background: 'initial',
            color: 'initial'
        }

    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return {handleClose, handleClick, isActive, open, language, setLanguage, anchorEl};
}
export default useLanguageSwitch;