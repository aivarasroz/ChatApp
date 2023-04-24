import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "../style/userCard.css"
import generateAvatar from '../modules/generateAvatar';

const UserCard = ({user}) => {
    const myUser = useSelector(store => store.myData.value.myUser)
    const nav = useNavigate()
    

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

    return (
        <div className='users-cont'>
           <div className="userCard">
              <div className='avatar-contt'>
                <img src={generateAvatar(user.email)} alt="Avatar" />
              </div>
              <h3>{user.email}</h3>
              <button onClick={openChat}>Message</button>
           </div>
        </div>
      );
};

export default UserCard;