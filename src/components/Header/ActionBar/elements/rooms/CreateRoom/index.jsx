import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BaseModal from "@/shared/UI/Modal/BaseModal";
import CreateRoomForm from "@/components/CreateRoom/CreateRoomForm";
import RedirectToRoomConfirm from "@/components/CreateRoom/RedirectToRoomConfirm";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";

import IconButton from "@/shared/UI/IconButton/IconButton";
import { AddBoxOutlined } from "@mui/icons-material";
import MovieBrowser from "@/pages/MovieBrowser";

import classes from "./CreateRoom.module.scss";

const CreateRoom = () => {
  const history = useHistory();
  const [modalActive, setModalActive] = useState(false);
  const [roomCreatedId, setRoomCreatedId] = useState(null);
  const [videoModel, setVideoModel] = useState("youtube");

  const redirectToVideo = () => {
    history.push(`/room/${roomCreatedId}`);
  };

  useEffect(() => {
    setRoomCreatedId(null);
  }, [modalActive]);

  const handleYoutube = () => {
    setVideoModel("youtube");
  };

  const handleLibrary = () => {
    // start transformation size 1000% ???
    history.push("/library");
    // setVideoModel("library")
  };

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <AddBoxOutlined />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        {!roomCreatedId ? (
          <div>
            <div className={classes.subContainer}>
              <span>Create a new room</span>
              <span className={classes.row}>
                <IconButton>
                  <SmartDisplayOutlinedIcon onClick={handleYoutube} />
                </IconButton>
                <IconButton>
                  <FolderOpenIcon onClick={handleLibrary} />
                </IconButton>
              </span>
            </div>
            {videoModel === "youtube" ? (
              <CreateRoomForm
                roomCreated={(roomId) => setRoomCreatedId(roomId)}
              />
            ) : (
              // library is multistep: select movie ; room form ; redirect confirmation
              <MovieBrowser />
            )}
          </div>
        ) : (
          <RedirectToRoomConfirm
            confirmed={() => {
              redirectToVideo();
            }}
          />
        )}
      </BaseModal>
    </>
  );
};

export default CreateRoom;
