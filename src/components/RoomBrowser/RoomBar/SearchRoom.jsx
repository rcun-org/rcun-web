import React, { useContext, useState } from "react"
import { RoomsContext } from "../../../context"
import BaseInput from "../../UI/Input/BaseInput"
import IconButton from "../../UI/IconButton/IconButton"
import BaseModal from "../../UI/Modal/BaseModal"
import { Search } from "@mui/icons-material"

const SearchRoom = () => {
  const [inputValue, setInputValue] = useState("")
  const [modalActive, setModalActive] = useState(false)

  const { setRoomSearch } = useContext(RoomsContext)

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
        <BaseInput
          isFancy={true}
          onChange={e => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          type="text"
          placeholder="Search room"
        />
      </BaseModal>
    </>
  )
}

export default SearchRoom
