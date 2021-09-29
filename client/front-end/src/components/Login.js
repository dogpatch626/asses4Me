import React, { Component, useContext } from "react";
import { UserContext } from "./UserContext";
import { useState } from "react";
import Particle from "react-particle-animation";
import { Redirect } from "react-router";
import "./styles/login.css";
import axios from "axios";
function Login() {
  // const {value, setValue} = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [regName, setRegname] = useState(null);
  const [regPass, setRegpass] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, "pass ", password);
    const loginData = { username: username, password: password };

    const user2 = await axios
      .post("http://localhost:4000/login", loginData)
      .catch((err) => {
        return false;
      });

    if (user2) {
      localStorage.setItem("user", user2.data.username);
      localStorage.setItem("jwt", user2.data.access);
      localStorage.setItem("_id", user2.data._id);
      setUser(user2.data.username);
    } else {
      alert("login incorrect");
    }
  };
  const handleSubmit2 = async () => {
    const regData = { username: regName, password: regPass, admin:false };
    const newUser = await axios.post("http://localhost:4000/user", regData).catch((err)=>{
        return false; 
    })
    if(!newUser){
        alert("Error regestering user")
    }else{
        alert("user created you may enter into the world of enviornmental issues dont be a fed")
    }
  };
  return (
    <div className="home-wrapper">
      <Particle
        className="particles"
        numParticles={250}
        interactive={true}
        color={{ r: 300, g: 0, b: 300, a: 255 }}
        background={{ r: 46, g: 52, b: 64, a: 255 }}
        lineWidth={1.2}
        particleRadius={1.2}
        particleSpeed={0.3}
      />
      <div style={{color:"white"}}>{user ? user : "Login for us buddy thanks"}</div>
      <form onSubmit={handleSubmit} className="formClass">
        <h3>Login</h3>
        <label for="username" style={{fontSize:"20px"}}>username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          id="username"
          required
        ></input>
         <label for="pass" style={{fontSize:"20px"}}>password</label>
        <input
          type="text"
          id="pass"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        ></input>
        <input type="submit" value="Submit" />
      </form>

      <br />
      <br></br>
      <form onSubmit={handleSubmit2} className="formClass">
        <h3>Register</h3>
        <label for="username" style={{fontSize:"20px"}}>username</label>
        <input
          type="text"
          onChange={(event) => {
            setRegname(event.target.value);
          }}
          required
          id="username"
        ></input>
         <label for="pass" style={{fontSize:"20px"}}>password</label>
        <input
          type="text"
          onChange={(event) => {
            setRegpass(event.target.value);
          }}
          id="pass"
          required
        ></input>
        <input type="submit" value="Submit" />
      </form>
      {user? <Redirect to='/home' /> : ""}
    </div>
  );
}

export default Login;
