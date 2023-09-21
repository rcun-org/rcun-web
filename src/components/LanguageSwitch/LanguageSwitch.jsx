import React from "react"
import { Language } from "@mui/icons-material";
import IconButton from "../UI/IconButton/IconButton";
import {Menu, MenuItem} from "@mui/material";
import {useLanguageSwitch} from "./index";

function LanguageSwitch(props) {
  const {handleClose, handleClick, isActive, open, setLanguage, anchorEl} = useLanguageSwitch()

  return (
    <>
      <IconButton onClick={handleClick}>
        <Language />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiList-root": {
            p: ".0",
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              m: '0 auto',
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem sx={isActive('eng')} onClick={() => setLanguage("eng")}>
          ENG
        </MenuItem>
        <MenuItem sx={isActive('rus')} onClick={() => setLanguage("rus")}>
          RUS
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitch
