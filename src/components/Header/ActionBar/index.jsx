import React from "react";

import CreateRoom from "./elements/rooms/CreateRoom";
import JoinRoom from "./elements/rooms/JoinRoom/JoinRoom";
import MyRooms from "./elements/rooms/MyRooms";
import Logout from "./elements/Logout/Logout";
import LanguageSwitch from "./elements/LanguageSwitch";

import GlobalSearch from "./elements/GlobalSearch";

import classes from "./ActionBar.module.scss";

import {
  allSections,
  CREATE_ROOM,
  JOIN_ROOM,
  MY_ROOMS,
  GLOBAL_SEARCH,
  LANGUAGE_SWITCH,
  LOGOUT
} from "@/shared/constants/headSection";

const ActionBar = ({ sections = allSections }) => {
  return (
    <div className={classes.actionBar}>
      {sections[GLOBAL_SEARCH] && <GlobalSearch />}
      {sections[CREATE_ROOM] && <CreateRoom />}
      {sections[JOIN_ROOM] && <JoinRoom />}
      {sections[MY_ROOMS] && <MyRooms />}
      {sections[LANGUAGE_SWITCH] && <LanguageSwitch />}
      <div className={classes.spacer} />
      {sections[LOGOUT] && <Logout />}
    </div>
  );
};

export default ActionBar;
