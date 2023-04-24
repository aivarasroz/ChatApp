import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/chatPage.css";
import TaskBar from "./taskbar";

const ChatPage = () => {
  const [chat, setChat] = useState(null);
  const myUser = useSelector((store) => store.myData.value.myUser);
  const users = useSelector((store) => store.myData.value.users);
  const msgRef = useRef();
  const { id } = useParams();
  const nav = useNavigate();

  const chatContainerRef = useRef();
  const lastMessageRef = useRef(null);

  const [activeUser, setActiveUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2500/getChat/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChat(data.chat);
        setActiveUser(data.chat.user);
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      });
  }, [id]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const openChat = (clickedUser) => {
    const data = {
      userOne: myUser.email,
      userTwo: clickedUser.email,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:2500/openChat", options)
      .then((res) => res.json())
      .then((data) => {
        nav("/chat/" + data.chatId);
        setSelectedUser(clickedUser);
      });
  };

  const sendMessage = () => {

    const message = msgRef.current.value.trim(); 
    if (!message) { 
      return; 
      }

    const timestamp = new Date().toLocaleString();
    const data = {
      id,
      message: {
        value: msgRef.current.value,
        user: myUser?.email,
        timestamp: timestamp
      },
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:2500/addMessage", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChat(data.chat);
        msgRef.current.value = "";
        const chatWindow = document.querySelector(".chat");
        chatWindow.scrollTop =
        chatWindow.scrollHeight - chatWindow.clientHeight;
      });
  };

  useEffect(() => {
    const chatWindow = document.querySelector(".chat");
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  }, [chat]);

  return (
    <div>
      <TaskBar />
      <div className="chat-cont">
        <div className="over-chat">
          {users.map((user) => (
           <div
           key={user.id ?? user.email}
           className={`avatar ${
             user === selectedUser ? "selected" : ""}`}
           onClick={() => openChat(user)}>
            <img
              src={user.avatarUrl}
              alt={user.email}
              onClick={() => openChat(user)}/>
            </div>
          ))}
        </div>
        {myUser && (
          <div ref={chatContainerRef} className="chat">
           <div className="flex1">
  {chat?.messages.map((x, i) => (
    <div
      key={i}
      className={
        x.user === myUser.email
          ? "my-message-container"
          : "other-message-container"}>
      <div
        className={
          x.user === myUser.email ? "my-message" : "other-message"}>
        {x.value.includes("http") ? (
          <div>
            <img className="chatImg" src={x.value} alt="" />
            <div className="message-meta">{x.user}</div>
            <span className="time">{new Date(x.timestamp).toLocaleTimeString()}</span>
          </div>
        ) : (
          <div>
            <div>{x.value}</div>
            <div className="time-user">
              <span className="time">{new Date(x.timestamp).toLocaleTimeString()}</span>
              <div className="message-meta">{x.user}</div>
            </div>
          </div>
        )}
      </div>
      <div className="avatar-container">
        <img
          className="avatar-img"
          src={users.find((user) => user.email === x.user)?.avatarUrl}
          alt=""
        />
      </div>
    </div>
  ))}
</div>
          </div>
        )}
        <div className="send-msg">
          <input
            type="text"
            ref={msgRef}
            placeholder="message"
            onKeyDown={handleKeyDown}/>
          <button onClick={sendMessage}>SEND</button>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;