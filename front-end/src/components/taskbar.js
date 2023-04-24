import React from 'react';
import { useSelector } from 'react-redux';
import "../style/taskbar.css"
import { Link } from 'react-router-dom';

const TaskBar = () => {
  const myUser = useSelector((store) => store.myData.value.myUser);

  if (!myUser) {
    return null;
  }

  return (
    
      <div className="taskbar">
        <div className="taskbar__left">
          <img src={myUser.avatarUrl} alt='avatar'></img>
          <p className='username'>{myUser.email}</p>
        </div>
        <div className="taskbar__right butt">
            <Link to="/users">Users</Link>
            <Link to="/profile/myProfile" >Profile</Link>
            <Link to="/">Logout</Link>
        </div>
      </div>
  );
};

export default TaskBar;