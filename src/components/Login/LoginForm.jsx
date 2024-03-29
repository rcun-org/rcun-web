import React, { useState } from "react"
import BaseInput from "../UI/Input/BaseInput"
import { login } from "../../services/auth.service"
import BaseButton from "../UI/Button/BaseButton"
import classes from "./Login.module.scss"
import { useAtom } from "jotai"
import { userTokenAtom } from "../../stores/auth-store"

const LoginForm = ({ className, onLogin }) => {
  const [token, setToken] = useAtom(userTokenAtom)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  const handleLogin = async () => {
    // todo add client-side validation
    const userToken = await login(loginData)

    setLoginData({
      username: "",
      password: "",
    })

    setToken(userToken)
    // if (userToken) {
    // onLogin(userToken)
    // }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }

  return (
    <div className={className}>
      <div className={classes.loginText}>Let's get acquainted! 🤪</div>

      <BaseInput
        isFancy={true}
        value={loginData.username}
        onKeyUp={handleKeyUp}
        onChange={event =>
          setLoginData({ ...loginData, username: event.target.value })
        }
        type="text"
        placeholder="Username"
      />

      <BaseInput
        isFancy={true}
        value={loginData.password}
        onChange={event =>
          setLoginData({ ...loginData, password: event.target.value })
        }
        onKeyUp={handleKeyUp}
        type="password"
        placeholder="Password"
      />

      {/*<BaseButton onClick={handleLogin}>Continue</BaseButton>*/}
    </div>
  )
}

export default LoginForm
