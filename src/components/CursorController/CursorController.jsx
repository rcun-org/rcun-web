import CursorZone from "../CursorZone";
import classes from "./CursorController.module.scss";
import cx from "classnames";

const CursorController = ({
  handlePlayPausePush,
  handleForwardArrowPush,
  handleBackArrowPush,
  handleChatToggle,
  isPaused
}) => {
  const subCursor = document.getElementById("sub-cursor");

  const handleUnfocus = (e) => {
    subCursor.classList = [];
    // subCursor.dataset.scaleFactor = 0;
    // subcursor opacity 0
    // subCursor.style.opacity = 0;
  };

  return (
    <div
      className={cx(classes.container)}
      tabIndex="0"
      onMouseLeave={handleUnfocus}
    >
      <CursorZone handler={handleBackArrowPush} zoneType={"back"} />
      <CursorZone
        handler={handlePlayPausePush}
        zoneType={isPaused ? "paused" : "playing"}
      />
      <CursorZone handler={handleForwardArrowPush} zoneType={"forward"} />
      <CursorZone handler={handleChatToggle} zoneType={"chatToggle"} />
    </div>
  );
};

export default CursorController;
