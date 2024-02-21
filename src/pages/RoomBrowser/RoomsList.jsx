import React, { useContext, useEffect, useState } from "react";
import RoomCard from "../../components/UI/RoomCard/RoomCard";
import styles from "../../components/UI/RoomCard/RoomCard.module.scss";

// import { AuthContext, RoomsContext } from "../../context";
import { getRooms, getRoomsDetails } from "../../services/room.services";
import { Skeleton } from "@mui/material";
import { useAtom } from "jotai";
import { roomsAtom, filteredRoomsAtom } from "../../stores/room-store";

// const API_URL = process.env["REACT_APP_API_SERVER"];

const RoomsList = (props) => {
  // const { rooms, setRooms, searchedVideos } = useContext(RoomsContext)

  const [, setRooms] = useAtom(roomsAtom);
  const [searchedRooms] = useAtom(filteredRoomsAtom);

  const [loading, setLoading] = useState(true);

  async function fetchRooms() {
    let roomsData = await getRooms();
    roomsData = await getRoomsDetails(roomsData);
    setRooms(roomsData);
    setLoading(false);
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const cardHeightRem = styles.cardHeight;
  const cardWidthRem = `calc(${cardHeightRem} * 1.75)`;
  console.log("Card h calculated:", cardHeightRem);

  return (
    <div {...props}>
      {searchedRooms.map((room, index) => {
        return loading ? (
          <Skeleton
            // width={cardWidth * 1.05}
            // height={cardWidth / 1.75}
            key={index}
            sx={{
              bgcolor: "#3b393f",
              width: cardWidthRem,
              height: cardHeightRem,
              zIndex: -100,
              borderRadius: "16px"
            }}
            animation="wave"
            variant="rounded"
          />
        ) : (
          <RoomCard key={index} index={index} room={room} />
        );
      })}
    </div>
  );
};

export default RoomsList;
