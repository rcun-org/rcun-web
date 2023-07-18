import React, { useContext } from "react"
import { logout } from "../../services/auth.service"
import { AuthContext } from "../../context"
import IconButton from "../UI/IconButton/IconButton"
import LogoutIcon from "@mui/icons-material/Logout"
// import CallMissedOutgoingOutlinedIcon from "@mui/icons-material/CallMissedOutgoingOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

const Logout = () => {
  const { setUserToken } = useContext(AuthContext)
  return (
    <div>
      <IconButton
        onClick={() => {
          logout()
          setUserToken(null)
        }}
      >
        <LogoutOutlinedIcon />
      </IconButton>
    </div>
  )
}

export default Logout
