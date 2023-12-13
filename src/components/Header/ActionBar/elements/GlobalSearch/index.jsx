import React, { useState, useEffect } from "react";
import BaseInput from "@/shared/UI/Input/BaseInput";
import IconButton from "@/shared/UI/IconButton/IconButton";
import { Search as SearchIcon, CancelOutlined } from "@mui/icons-material";
import { searchAtom } from "@/shared/lib/stores/search-store";

import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

import { getPlaceholderByPathname } from "./utils";

import classes from "./GlobalSearch.module.scss";
import { CSSTransition } from "react-transition-group";

const GlobalSearch = () => {
  const location = useLocation();

  const [inputAtom, setInputAtom] = useAtom(searchAtom);
  const [inputValue, setInputValue] = useState(inputAtom);
  const debounceValue = useDebounce(inputValue);

  const [showInput, setShowInput] = useState(false);
  const placeholder = getPlaceholderByPathname(location.pathname);

  useEffect(() => {
    if (inputValue) {
      setInputValue("");
    }
  }, [location.pathname]);

  useEffect(() => {
    setInputAtom(debounceValue);
  }, [debounceValue]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleInput = () => {
    setShowInput(!showInput);

    if (showInput) {
      setInputValue("");
    }
  };

  return (
    <div className={classes.container}>
      <CSSTransition
        timeout={400}
        in={showInput}
        classNames={{
          enter: classes.inputEnter,
          enterActive: classes.inputEnterActive,
          exit: classes.inputExit,
          exitActive: classes.inputExitActive
        }}
        unmountOnExit
        appear
      >
        <BaseInput
          value={inputValue}
          onChange={onChange}
          type="text"
          className={classes.input}
          placeholder={placeholder}
        />
      </CSSTransition>
      <IconButton onClick={toggleInput}>
        {showInput ? <CancelOutlined /> : <SearchIcon />}
      </IconButton>
    </div>
  );
};

export default GlobalSearch;
