import React, { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/"
import classes from "./Chat.module.scss";

function Chat(props) {
  let socketRef = useRef(new SockJS("http://localhost:5000/ws/room"));

  let autoScroll = useRef()
  
  let {userToken} = useContext(AuthContext)

  console.log(userToken)

  let [msgHistory,setMsgHistory] = useState([])


  useEffect(()=>autoScroll.current.scrollIntoView({ behavior: "smooth" }),[msgHistory])
  

  useEffect(() => {
    socketRef.current.onopen = function () {
      console.log("open");
    };

    socketRef.current.onmessage = function (e) {
      let msg = e.data;
      console.log(e.data)
      setMsgHistory(prev => prev.concat([msg]))

    };

    socketRef.current.onclose = function () {
      console.log("close");
    };
  }, []);

  let chatInputRef = useRef(null);

  function sendMessage() {
    let msg = chatInputRef.current.value;
    socketRef.current.send(msg);
    chatInputRef.current.value=''
  }

  //  Checks if pressed button is 'Enter' to send the message
  function handleEnterPush(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
  }

  


  return (
    <div className={classes.chat_window}>
      <div className={classes.msg_history}>
      {console.log(msgHistory)}
      {console.log(typeof(msgHistory))}
        {msgHistory.map((item,index)=>
            <div className={classes.msg_item} key={index} >
              {'Message: '+ item}
            </div>)
            
          
        }
        <div style={{ float:"left", clear: "both", opacity: '0'}} ref={autoScroll}>
          
        </div>
          
      </div>
      
      <input type="text" onKeyDown={handleEnterPush} ref={chatInputRef} placeholder='type smth...'/>
    </div>
  );
}

export default Chat;
