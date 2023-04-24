import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../features/data";
import UserCard from "../components/userCard";
import "../style/usersPage.css"
import { Link, useNavigate } from 'react-router-dom';


const UsersPage = () => {
    const disp = useDispatch()
    const nav = useNavigate()

    

    const users = useSelector(store => store.myData.value.users)
    const myUser = useSelector(store => store.myData.value.myUser)

    useEffect(() => {
        if(!myUser) return
        fetch("http://localhost:2500/getUsers")
            .then(res => res.json())
            .then(data => {
                console.log(data)

                const filteredUsers = data.users.filter(x => x.email !== myUser.email)

                disp(setUsers(filteredUsers))
            })

    }, [])

    const handleUserClick = (userId) => {
      nav(`/user/${userId}`);
    };

    return (
      <div className="container">
        <div className="taskbar">
          <div className="taskbar__left">
            <img src={myUser.avatarUrl} alt="avatar"></img>
            <p className='username'>{myUser.email}</p>
          </div>
          <div className="taskbar__right butt">
            <Link to="/users">Users</Link>
            <Link to="/profile/myProfile" >Profile</Link>
            <Link to="/">Logout</Link>
          </div>
        </div>
        <div className="user-cont">
        <div className="page-container">
          {users.map((user, i) => (
            <div key={i} onClick={() => handleUserClick(user.email)}>
              <Link className='link' to={`/user/${user.email}`}>
                <UserCard user={user} avatarUrl={user.avatarUrl} />
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  };

export default UsersPage;