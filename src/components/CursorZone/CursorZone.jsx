import classes from "./CursorZone.module.scss"

const subCursor = document.querySelector("#sub-cursor")
const cursor = document.querySelector("#cursor")

const CursorZone = ({ handler, zoneType }) => {
  const doCursorSize = e => {
    let x = subCursor.getBoundingClientRect().x
    let y = subCursor.getBoundingClientRect().y

    // let centerness = 1 if centered, 0 if at edge
    // get absolute page width
    let pageWidth = window.innerWidth * 0.8
    let pageHeight = window.innerHeight * 0.7
    let centerness = 1 - Math.abs(x - pageWidth / 2) / (pageWidth / 2)
    // centerness but two dimensional
    let centerness2d =
      1 -
      Math.sqrt(
        Math.pow(x - pageWidth / 2, 2) + Math.pow(y - pageHeight / 2, 2)
      ) /
        Math.sqrt(Math.pow(pageWidth / 2, 2) + Math.pow(pageHeight / 2, 2))

    console.log("centerness: ", centerness)
    // add data to subCursor element tag
    subCursor.dataset.scaleFactor = Math.max(centerness2d, 0.4)
  }

  const handleMouseMove = e => {
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
      doCursorSize(e)
    }
  }

  const handleClick = e => {
    handler()
    if (zoneType === "playing" || zoneType === "paused") {
      zoneType = zoneType === "playing" ? "paused" : "playing"
      handleMouseMove(e)
    }
  }

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className={classes.zone}
    ></div>
  )
}

export default CursorZone
