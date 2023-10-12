import { useEffect, useState } from "react";

const useCursorFocused = (initialValue) => {
  let [isFocused, setIsFocused] = useState(initialValue ?? false);

  useEffect(() => {
    let c = document.getElementById("sub-cursor");

    if (isFocused) {
      c.classList.add("cursor-over-input");
    } else {
      c.classList.remove("cursor-over-input");
    }
  }, [isFocused]);

  return {
    isFocused,
    setIsFocused
  };
};

export default useCursorFocused;
