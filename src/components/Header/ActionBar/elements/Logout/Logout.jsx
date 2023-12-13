import React, { useContext } from "react";
import { logout } from "@/shared/services/auth.service";
import { AuthContext } from "@/shared/lib/context";
import IconButton from "@/shared/UI/IconButton/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
// import CallMissedOutgoingOutlinedIcon from "@mui/icons-material/CallMissedOutgoingOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAtom } from "jotai";
import { userTokenAtom } from "@/shared/lib/stores/auth-store";

const Logout = () => {
  // const { setUserToken } = useContext(AuthContext)
  const [, setUserToken] = useAtom(userTokenAtom);
  return (
    <div>
      <IconButton
        onClick={() => {
          logout();
          setUserToken(null);
        }}
      >
        <LogoutOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default Logout;
