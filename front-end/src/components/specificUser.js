import TaskBar from './taskbar'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../features/data";
import "../style/specificUser.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import generateAvatar from '../modules/generateAvatar';

const SpecificUser = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { email } = useParams();

  const users = useSelector((store) => store.myData.value.users);
  const myUser = useSelector((store) => store.myData.value.myUser);
  const user = users?.find((u) => u.email === email);

  
  const openChat = () => {
    const users = {
        userOne: myUser.email,
        userTwo: user.email
    }

    const options = {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(users)
    }

    fetch("http://localhost:2500/openChat", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            nav("/chat/"+data.chatId)
        })
}

  useEffect(() => {
    if (!myUser) return;
    fetch('http://localhost:2500/getUsers')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const filteredUsers = data?.users?.filter((x) => x.email !== myUser.email);

        dispatch(setUsers(filteredUsers));
      });
  }, []);

  if (!user) return <div>User not found.</div>;

  return (
    <div className='proffile'>
      <TaskBar />
      <div className='user-profile-cont'>
      <div className="profile-card">
        <h2>User's Profile</h2>
        <img src={generateAvatar(user.email)} alt="Avatar" />
        <p>{user.email}</p>
        <button className='profile-but' onClick={openChat}>Send Message</button>
      </div>
      </div>
    </div>
  );
};

export default SpecificUser;