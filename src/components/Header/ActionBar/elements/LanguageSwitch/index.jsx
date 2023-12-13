import React from "react";
import { Language } from "@mui/icons-material";
import IconButton from "@/shared/UI/IconButton/IconButton";
import { Menu, MenuItem } from "@mui/material";
import useLanguageSwitch from "./useLanguageSwitch";

function LanguageSwitch() {
  const { handleClose, handleClick, isActive, open, setLanguage, anchorEl } =
    useLanguageSwitch();

  return (
    <>
      <IconButton onClick={handleClick}>
        <Language />
      </IconButton>
      {/*<div style={{position: "absolute", bottom: "-8px", display: open? "flex" : "none"}}>*/}
      {/*  <ul style={{margin: 0, padding: 0}}>*/}
      {/*    <MenuItem sx={isActive('en')} onClick={() => setLanguage("en")}>*/}
      {/*      Eng*/}
      {/*    </MenuItem>*/}
      {/*    <MenuItem sx={isActive('ru')} onClick={() => setLanguage("ru")}>*/}
      {/*      Rus*/}
      {/*    </MenuItem>*/}
      {/*    <MenuItem sx={isActive('ar')} onClick={() => setLanguage("ar")}>*/}
      {/*      Arb*/}
      {/*    </MenuItem>*/}
      {/*  </ul>*/}
      {/*</div>*/}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiList-root": {
            p: ".0"
          },
          "& .MuiMenuItem-root": {
            lineHeight: "1em",
            px: 2.25
          }
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            boxShadow:
              "0px var(--shadow-y) var(--shadow-blur) var(--shadow-inset) var(--shadow-color)",
            overflow: "visible",
            mt: 1.5,
            py: 0.5,
            background: "var(--grey-500)",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            }
          }
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem sx={isActive("en")} onClick={() => setLanguage("en")}>
          Eng
        </MenuItem>
        <MenuItem sx={isActive("ru")} onClick={() => setLanguage("ru")}>
          Rus
        </MenuItem>
        <MenuItem sx={isActive("ar")} onClick={() => setLanguage("ar")}>
          Arb
        </MenuItem>
      </Menu>
    </>
  );
}

export default LanguageSwitch;
