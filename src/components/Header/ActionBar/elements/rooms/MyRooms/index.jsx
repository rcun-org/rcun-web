import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BaseModal from "@/shared/UI/Modal/BaseModal";
import IconButton from "@/shared/UI/IconButton/IconButton";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import BaseButton from "@/shared/UI/Button/BaseButton";
import { RoomsContext } from "@/shared/lib/context";
import { useAtom } from "jotai";
import { roomFilterQueryAtom } from "@/shared/lib/stores/room-store";

import classes from "./MyRooms.module.scss";

const MyRooms = () => {
  const history = useHistory();

  const [modalActive, setModalActive] = useState(false);
  const [roomCreatedId, setRoomCreatedId] = useState(null);

  const [roomFilter, setRoomFilter] = useAtom(roomFilterQueryAtom);

  useEffect(() => {
    setRoomCreatedId(null);
  }, [modalActive]);

  const handleMyRooms = () => {
    setRoomFilter("my-rooms");
    setModalActive(false);
    // if we in movie library, then go to /
    if (history.location.pathname !== "/") {
      history.push("/");
    }
  };

  const handlePublicRooms = () => {
    setRoomFilter("public-rooms");
    setModalActive(false);
    if (history.location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <WindowOutlinedIcon />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          {/* <SearchRoom /> */}
          <BaseButton onClick={handleMyRooms}>My rooms</BaseButton>
          <BaseButton onClick={handlePublicRooms}>Public rooms</BaseButton>
        </div>
      </BaseModal>
    </>
  );
};

export default MyRooms;
