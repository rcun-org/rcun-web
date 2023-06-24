import CursorZone from "../CursorZone"
import classes from "./CursorController.module.scss"

const CursorController = ({
  handlePlayPausePush,
  handleForwardArrowPush,
  handleBackArrowPush,
  isPaused,
}) => {
  const subCursor = document.getElementById("sub-cursor")

  const handleUnfocus = e => {
    subCursor.classList = []
  }

  return (
    <div
      className={classes.container}
      tabIndex="0"
      onMouseLeave={handleUnfocus}
    >
      <CursorZone handler={handleBackArrowPush} zoneType={"back"} />
      <CursorZone
        handler={handlePlayPausePush}
        zoneType={isPaused ? "paused" : "playing"}
      />
      <CursorZone handler={handleForwardArrowPush} zoneType={"forward"} />
    </div>
  )
}

export default CursorController
