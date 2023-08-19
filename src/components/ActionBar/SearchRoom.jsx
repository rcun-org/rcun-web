import React, { useContext, useState } from "react"
import { RoomsContext } from "../../context"
import BaseInput from "../UI/Input/BaseInput"
import IconButton from "../UI/IconButton/IconButton"
import BaseModal from "../UI/Modal/BaseModal"
import { Search } from "@mui/icons-material"
import classes from "./SearchRoom.module.scss"
import { useAtom } from "jotai"
import { roomSearchQueryAtom } from "../../stores/room-store"

const SearchRoom = () => {
  const [inputValue, setInputValue] = useState("")
  const [modalActive, setModalActive] = useState(false)

  // const { setRoomSearch } = useContext(RoomsContext)

  const [roomSearch, setRoomSearch] = useAtom(roomSearchQueryAtom)

  const onInput = query => {
    setRoomSearch(query)
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      onInput(inputValue)
    }
  }

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <Search />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          <BaseInput
            isFancy={true}
            onChange={e => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            type="text"
            placeholder="Search room"
          />
        </div>
      </BaseModal>
    </>
  )
}

export default SearchRoom
