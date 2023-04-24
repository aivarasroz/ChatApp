import React, { useState } from 'react';
import TaskBar from './taskbar';
import '../style/userProfile.css'
import { useSelector } from 'react-redux';
import {useNavigate, Link} from "react-router-dom";

const UserProfile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const nav = useNavigate()

  const myUser = useSelector((store) => store.myData.value.myUser);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('http://localhost:2500/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: myUser.email,
          newPassword: newPassword
        })
      });

      if (response.ok) {
        alert('Password changed successfully!');
        setShowChangePassword(false);
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        alert('Failed to change password.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while changing the password.');
    }
  }

  const handleDeleteUser = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
  
    if (confirmed) {
      try {
        const response = await fetch('http://localhost:2500/delete-user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: myUser.email
          })
        });
    
        if (response.ok) {
          alert('User deleted successfully!');
          nav('/');
        } else {
          alert('Failed to delete user.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the user.');
      }
    }
  }

  return (
    <div className='proffile'>
      <TaskBar />
      <div className='user-profile-cont'>
        <div className='user-card'>
          <h2>My Profile</h2>
          <img src={myUser.avatarUrl} alt='User Avatar' />
          <div className='user-details'>
            <p className='user-email'>{myUser.email}</p>
            <div className='user-actions'>
              <button onClick={() => setShowChangePassword(true)}>Change Password</button>
              <button onClick={handleDeleteUser}>Delete User</button>
            </div>
          </div>
        </div>
      </div>
      {showChangePassword &&
        <div className='password-change-popup'>
          <form onSubmit={handlePasswordChange}>
            <input
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm New Password'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type='submit'>Save Changes</button>
            <button onClick={() => setShowChangePassword(false)}>Cancel</button>
          </form>
        </div>
      }
    </div>
  )
}

export default UserProfile;