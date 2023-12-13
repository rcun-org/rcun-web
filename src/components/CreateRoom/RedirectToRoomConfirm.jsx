import React from "react";
import BaseButton from "@/shared/UI/Button/BaseButton";
import classes from "./redirect-dialog.module.scss";
const RedirectToRoomConfirm = ({ confirmed }) => {
  return (
    <div className={classes.container}>
      <h2>Room created</h2>
      <BaseButton onClick={() => confirmed()}>Join</BaseButton>
    </div>
  );
};

export default RedirectToRoomConfirm;
