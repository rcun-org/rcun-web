import React, { useContext, useState } from "react"
import { RoomsContext } from "../../../context"
import BaseInput from "../../UI/Input/BaseInput"

const SearchRoom = () => {
  const [inputValue, setInputValue] = useState("")

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
    <BaseInput
      isFancy={true}
      onChange={e => setInputValue(e.target.value)}
      onKeyUp={handleKeyUp}
      type="text"
      placeholder="Search room"
    />
  )
}

export default SearchRoom
