import { useEffect, useState } from "react";

const useCursorFocused = (initialValue, baseClass = "cursor-over-input") => {
  let [isFocused, setIsFocused] = useState(initialValue ?? false);

  useEffect(() => {
    let c = document.getElementById("sub-cursor");

    if (isFocused) {
      c.classList.add(baseClass);
    } else {
      c.classList.remove(baseClass);
    }
  }, [isFocused]);

  const handleFocusCursor = () => setIsFocused(true);
  const handleUnfocusCursor = () => setIsFocused(false);

  return {
    isFocused,
    setIsFocused,
    handleUnfocusCursor,
    handleFocusCursor
  };
};

export default useCursorFocused;
