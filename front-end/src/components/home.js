import React from 'react';
import { Link } from 'react-router-dom';
import "../style/home.css"


const Home = () => {
  return (
     <div className="home-container">
      <div className='logo'>
        <img src='https://chappme.co/blog/content/images/2020/08/Chapp-Logo-Versions-01-2.png' alt='img'></img>
      </div>
      <div className="button-container">
        <Link to="/login" className="login-button">
          Login
        </Link>
        <Link to="/register" className="register-button">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Home;