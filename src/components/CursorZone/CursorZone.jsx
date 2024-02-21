import classes from "./CursorZone.module.scss";

const subCursor = document.querySelector("#sub-cursor");
const cursor = document.querySelector("#cursor");

const CursorZone = ({ handler, zoneType }) => {
  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  const doCursorSize = (e) => {
    let x = e.pageX;
    let y = e.pageY;

    let pageWidth = getWidth() * 1;
    let pageHeight = getHeight() * 1;
    // let centerness = 1 - Math.abs(x - pageWidth / 2) / (pageWidth / 2)
    let centerness2d =
      1 -
      Math.sqrt(
        Math.pow(x - pageWidth / 2, 2) + Math.pow(y - pageHeight / 2, 2)
      ) /
        Math.sqrt(Math.pow(pageWidth / 2, 2) + Math.pow(pageHeight / 2, 2));

    // add data to subCursor element tag
    subCursor.dataset.scaleFactor = Math.max(centerness2d * 0.6, 0.3);
  };

  const handleMouseMove = (e) => {
    const opacityAnimationDuration = 100;
    if (cursor && subCursor) {
      cursor.classList.remove("show");
      if (zoneType === "playing") {
        if (!subCursor.classList.contains("cursor-pause")) {
          subCursor.style.opacity = 0;
          setTimeout(() => {
            subCursor.classList = [];
            subCursor.classList.add("cursor-pause");
            subCursor.style.opacity = 1;
          }, opacityAnimationDuration);
        }
      } else if (zoneType === "paused") {
        if (!subCursor.classList.contains("cursor-play")) {
          subCursor.style.opacity = 0;
          setTimeout(() => {
            subCursor.classList = [];
            subCursor.classList.add("cursor-play");
            subCursor.style.opacity = 1;
          }, opacityAnimationDuration);
        }
      } else if (zoneType === "back") {
        if (!subCursor.classList.contains("cursor-back")) {
          subCursor.style.opacity = 0;
          setTimeout(() => {
            subCursor.classList = [];
            subCursor.classList.add("cursor-back");
            subCursor.style.opacity = 1;
          }, opacityAnimationDuration);
        }
      } else if (zoneType === "forward") {
        if (!subCursor.classList.contains("cursor-forward")) {
          subCursor.style.opacity = 0;
          setTimeout(() => {
            subCursor.classList = [];
            subCursor.classList.add("cursor-forward");
            subCursor.style.opacity = 1;
          }, opacityAnimationDuration);
        }
      } else if (zoneType === "chatToggle") {
        if (!subCursor.classList.contains("cursor-play")) {
          subCursor.style.opacity = 0;
          setTimeout(() => {
            subCursor.classList = [];
            subCursor.classList.add("cursor-play");
            subCursor.style.opacity = 1;
          }, opacityAnimationDuration);
        }
      }
      doCursorSize(e);

      // chat toggling
    }
  };

  const handleClick = (e) => {
    handler();
    if (zoneType === "playing" || zoneType === "paused") {
      zoneType = zoneType === "playing" ? "paused" : "playing";
      handleMouseMove(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className={classes.zone}
    ></div>
  );
};

export default CursorZone;
