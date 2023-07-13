import React, { useContext } from "react"
import { logout } from "../../services/auth.service"
import { AuthContext } from "../../context"
import IconButton from "../UI/IconButton/IconButton"
import LogoutIcon from "@mui/icons-material/Logout"

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
        <LogoutIcon />
      </IconButton>
    </div>
  )
}

export default Logout
