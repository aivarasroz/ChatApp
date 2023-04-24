import React, {useRef, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setMyUser} from "../features/data";
import "../style/login.css"

const Login = ({setUser}) => {

    const nav = useNavigate()

    const disp = useDispatch()

    const emailRef = useRef()
    const passRef = useRef()

    const [error, setError] = useState("")

    const validateEmail = (email) => {
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return regexEmail.test(email)
    };


    function auth(e) {
      e.preventDefault()
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        const emilValid = validateEmail(user.email)

        if(!emilValid) return setError("Email is not Valid.")
        if(user.password.length < 3 || user.password.length > 20) return setError("Password length is incorrect")

        if(!/[A-Z]/.test(user.password)) return setError("Include at least one UpperCase letter.")

        setError("")

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:2500/login", options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(!data.success) {
                  
                    return setError("Incorrect username or password")
                }
                setTimeout(() => {
                  nav('/profile/myProfile');
                }, 2000); 

                disp(setMyUser(data.user))

            })
    }
    return (
      <div className='login-container'>
        <div className="card">
          <h1>Login</h1>
          <form>
            <label>
              Email:
              <input type="email" name="email" ref={emailRef} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" ref={passRef} />
            </label>
            {error && <div className="error">{error}</div>}
            <br />
            <button onClick={auth}>Login</button>
          </form>
          <h5>Don't have an account? <Link to="/register">Register here</Link></h5>
        </div>
      </div>
    );
  }

export default Login;