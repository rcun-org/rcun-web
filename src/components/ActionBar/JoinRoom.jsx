import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseInput from "../UI/Input/BaseInput";
import classes from "./SearchRoom.module.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "../UI/IconButton/IconButton";
import BaseModal from "../UI/Modal/BaseModal";

const JoinRoom = () => {
  let history = useHistory();

  const [inputValue, setInputValue] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const onInput = (query) => {
    history.push(`/room/${query}`);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onInput(inputValue);
    }
  };

  return (
    <>
      <IconButton onClick={() => setModalActive(true)} label={"Join room"}>
        <ExitToAppIcon />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          <BaseInput
            isFancy={true}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyUp}
            type="text"
            placeholder="Join by room id"
          />
        </div>
      </BaseModal>
    </>
  );
};

export default JoinRoom;
