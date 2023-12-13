import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseInput from "@/shared/UI/Input/BaseInput";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@/shared/UI/IconButton/IconButton";
import BaseModal from "@/shared/UI/Modal/BaseModal";

import classes from "../../Shared.module.scss";

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
      <IconButton onClick={() => setModalActive(true)}>
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
