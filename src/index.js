import ReactDom from "react-dom";
import App from "./App";

const root = document.getElementById("app");

ReactDom.render(<App />, root);

// on mouse move
const cursor = document.getElementById("cursor");
const subCursor = document.getElementById("sub-cursor");
subCursor.dataset.scaleFactor = 1;

const handleMouseMove = (e) => {
  //   document.body.style.cursor = "none"

  let subCursorWidth = subCursor.offsetWidth;
  let subCursorHeight = subCursor.offsetHeight;

  subCursor.style.transform = `translate(${e.pageX - subCursorWidth / 2}px, ${
    e.pageY - subCursorHeight / 2
  }px) scale(${subCursor.dataset.scaleFactor})`;
};

window.addEventListener("mousemove", handleMouseMove);
