import React, { useContext, useEffect, useState } from "react";
import RoomCard from "../Room/RoomCard/RoomCard";
import styles from "../Room/RoomCard/RoomCard.module.scss";

import { AuthContext, RoomsContext } from "@/shared/lib/context";
import { getRooms, getRoomsDetails } from "@/shared/services/room.services";
import { Skeleton } from "@mui/material";
import { useAtom } from "jotai";
import { roomsAtom, filteredRoomsAtom } from "@/shared/lib/stores/room-store";
import { searchAtom } from "@/shared/lib/stores/search-store";
import compareStrings from "@/shared/lib/utils/compareStrings";

const API_URL = process.env["REACT_APP_API_SERVER"];

const RoomsList = (props) => {
  // const { rooms, setRooms, searchedVideos } = useContext(RoomsContext)

  const [, setRooms] = useAtom(roomsAtom);
  const [searchedRooms] = useAtom(filteredRoomsAtom);
  const [searchValue] = useAtom(searchAtom);

  const [loading, setLoading] = useState(false);

  async function fetchRooms() {
    setLoading(true);
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

  const calculatedSearchedRooms = searchValue
    ? searchedRooms.filter((srEl) => compareStrings(srEl.title, searchValue))
    : searchedRooms;

  return (
    <div {...props}>
      {calculatedSearchedRooms.map((room, index) => {
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
