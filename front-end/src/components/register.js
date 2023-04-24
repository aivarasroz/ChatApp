import React, {useRef, useState,} from 'react';
import {useNavigate, Link} from "react-router-dom";
import "../style/register.css"

const Register = () => {
    const nav = useNavigate()

    const emailRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()

    const [errors, setError] = useState("")
    const [registrationStatus, setRegistrationStatus] = useState("");

    const validateEmail = (email) => {
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return regexEmail.test(email)
    };

    

    function auth(e) {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value
        }

        const emailValid = validateEmail(user.email)
        const NewErrors = [];

        if(!emailValid) {
          NewErrors.push('Incorrect email');
        }
        if(user.passOne !== user.passTwo){
          NewErrors.push('Passwords do not match')
        }
        if(user.passOne.length < 3 || user.passOne.length > 20) {
          NewErrors.push("password should be between 3 - 16 letters")
        }
        if(!/[A-Z]/.test(user.passOne)){
          NewErrors.push("password must have at least one Uppercase letter")
        }
        if (NewErrors.length > 0) {
          setError(NewErrors.join(', '));
          setRegistrationStatus("")
          return;
        }
      
        setError('');

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:2500/register", options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                  setRegistrationStatus("User registered successfully.");
                  setTimeout(() => {
                    nav('/login');
                  }, 2000); 
                } else {
                  setRegistrationStatus("This email already been used.");
                }
            })
          }

          return (
            <div className="register-container">
              <div className="home-cont">
                <Link to="/" className="home-button">
                  Home
                </Link>
              </div>
              <div className="register-card">
                <h1>Register</h1>
                <form onSubmit={auth}>
                  <label>
                    Email:
                    <input type="email" ref={emailRef} />
                  </label>
                  <br />
                  <label>
                    Password:
                    <input type="password" ref={passOneRef} />
                  </label>
                  <br />
                  <label>
                    Confirm Password:
                    <input type="password" ref={passTwoRef} />
                  </label>
                  <br />
                  <button type="submit">Register</button>
                </form>
                {errors && <p className='errors'>{errors}</p>}
                {registrationStatus && <p>{registrationStatus}</p>}
              </div>
            </div>
          );
        };

export default Register;