import React, { useState } from "react"
import BaseButton from "../../UI/Button/BaseButton"
import { useHistory } from "react-router-dom"
import BaseInput from "../../UI/Input/BaseInput"
import classes from "./SearchRoom.module.scss"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import IconButton from "../../UI/IconButton/IconButton"
import BaseModal from "../../UI/Modal/BaseModal"

import InputOutlinedIcon from "@mui/icons-material/InputOutlined"

const JoinRoom = () => {
  let history = useHistory()

  const [inputValue, setInputValue] = useState("")
  const [modalActive, setModalActive] = useState(false)

  const onInput = query => {
    history.push(`/room/${query}`)
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      onInput(inputValue)
    }
  }

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <ExitToAppIcon />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          <BaseInput
            isFancy={true}
            onChange={e => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            type="text"
            placeholder="Join by room id"
          />
        </div>
      </BaseModal>
    </>
  )
}

export default JoinRoom
