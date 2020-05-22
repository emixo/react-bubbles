import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { useHistory } from "react-router-dom"

const initialLogin = {
  username: "",
  password: ""
}

const Login = () => {
  const { push } = useHistory()
  const [loginInputs, setLoginInputs] =useState(initialLogin)
  const captureLogin = (e) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post("/api/login", loginInputs)
    .then(res => {
      localStorage.setItem("token", res.data.payload)
      push("/protected")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={submitLogin}>
        <label htmlFor="username">Username:</label>
        <input 
        name="username"
        value={loginInputs.username}
        onChange={captureLogin}
        />
        <label htmlFor="password">Password:</label>
        <input
        name="password"
        value={loginInputs.password}
        onChange={captureLogin}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;