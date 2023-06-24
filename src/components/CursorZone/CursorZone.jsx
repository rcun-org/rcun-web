import classes from "./CursorZone.module.scss"

const subCursor = document.querySelector("#sub-cursor")
const cursor = document.querySelector("#cursor")

const CursorZone = ({ handler, zoneType }) => {
  const handleCursorMutation = _ => {
    if (cursor && subCursor) {
      subCursor.classList = []
      cursor.classList.remove("show")
      if (zoneType === "playing") {
        subCursor.classList.add("cursor-pause")
      } else if (zoneType === "paused") {
        subCursor.classList.add("cursor-play")
      } else if (zoneType === "back") {
        subCursor.classList.add("cursor-back")
      } else if (zoneType === "forward") {
        subCursor.classList.add("cursor-forward")
      }
    }
  }

  const handleClick = e => {
    handler()
    if (zoneType === "playing" || zoneType === "paused") {
      zoneType = zoneType === "playing" ? "paused" : "playing"
      handleCursorMutation()
    }
  }

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleCursorMutation}
      className={classes.zone}
    ></div>
  )
}

export default CursorZone
