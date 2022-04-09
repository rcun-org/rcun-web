import React,{useRef,useEffect} from 'react' 
import classes from './InputButton.module.scss'
import Input from '@jimsheen/react-dynamic-input-width';
import {useHistory} from 'react-router-dom'

function InputButton(props){
  let inputFieldRef = useRef()
  let inputBtnRef = useRef()
  let history = useHistory()
  function putFocusOnInput(){
    inputFieldRef.current.focus()
  }

  function handleEnterPush(event){
    event.key === "Enter"? history.push(`/room/${inputFieldRef.current.value}`):null
    
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputBtnRef.current && !inputBtnRef.current.contains(event.target)) {
        props.hideJoinBtn()
      }
    }

    inputFieldRef.current.focus()
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
  return (
    <div className={classes.input_btn} onClick={putFocusOnInput} ref={inputBtnRef}>
      <div className={classes.input_wrapper}>
        <Input className={classes.input_field}  ref={inputFieldRef} onKeyDown={handleEnterPush}/>
      </div>
    </div>
  )
  
}

export default InputButton