import React from "react";
import { logout } from "../../services/auth.service";
import IconButton from "../UI/IconButton/IconButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAtom } from "jotai";
import { userTokenAtom } from "../../stores/auth-store";

const Logout = () => {
  const [, setUserToken] = useAtom(userTokenAtom);
  return (
    <div>
      <IconButton
        onClick={() => {
          logout();
          setUserToken(null);
        }}
        label={"Log out"}
      >
        <LogoutOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default Logout;
