import { useState } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "@/shared/lib/stores/language-store";

const useLanguageSwitch = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [language, setLanguage] = useAtom(languageAtom);
  // const lang = localStorage.getItem("lng");

  const isActive = (lang) => {
    if (language === lang) {
      return {
        color: "var(--accent-color-300)"
      };
    }
    return {
      color: "var(--white)",
      "&:hover": {
        color: "var(--accent-color-550)"
      }
    };
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    handleClose,
    handleClick,
    isActive,
    open,
    language,
    setLanguage,
    anchorEl
  };
};
export default useLanguageSwitch;
