import { useAtom } from "jotai";
import CursorZone from "../CursorZone";
import classes from "./CursorController.module.scss";
import cx from "classnames";
import { cursorsAtom } from "../../stores/cursor-store";
import { useEffect } from "react";

const CursorEntity = ({ cursorData }) => {
  const x = cursorData.x;
  const y = cursorData.y;

  return (
    <div
      className={cx(classes.cursorEntity)}
      style={{
        top: `calc(${y}vh + 20px)`,
        left: `calc(${x}vw - 20px)`
      }}
    >
      {cursorData.sender}
    </div>
  );
};

const CursorSpawner = ({}) => {
  const [cursors] = useAtom(cursorsAtom);

  // useEffect(() => {
  // console.log("cursors!!", Object.keys(cursors));
  // }, [cursors]);

  return (
    <div className={cx(classes.ignoredContainer)}>
      {Object.keys(cursors).map((sender) => {
        // set as style cursors position
        return <CursorEntity cursorData={cursors[sender]} />;
      })}
    </div>
  );
};

export default CursorSpawner;
