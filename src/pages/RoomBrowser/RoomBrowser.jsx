import React, { useEffect, useContext, useMemo, useState } from "react"
import RoomsList from "./RoomsList"
import ActionBar from "../../components/ActionBar/ActionBar"

import { RoomsContext, AuthContext } from "../../context"
import Header from "../../components/Header/Header"

import classes from "./RoomBrowser.module.scss"
import { useAtom } from "jotai"
import { userDataAtom } from "../../stores/auth-store"

const RoomBrowser = () => {
  // const { userData } = useContext(AuthContext)
  const [userData] = useAtom(userDataAtom)

  useEffect(() => {
    const subCursor = document.querySelector("#sub-cursor")
    subCursor.classList = []
  }, [])

  return (
    <div className={classes.container}>
      <Header pageTitle={"Browse rooms"} />
      <RoomsList className={classes.roomsList} />
    </div>
  )
}

export default RoomBrowser
