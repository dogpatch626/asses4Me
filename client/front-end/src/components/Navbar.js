import React from "react";
import "./styles/nav.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Link,
} from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
function Navbar(props) {
  const [id, setId] = useState(0);
  const { user, setUser } = useContext(UserContext);

  return (

      <div id="mainNav">
        <Link to="/account">
          <button>{user}</button>
        </Link>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/create">
          <button>Create an Issue!</button>
        </Link>
       <button onClick={()=>{
           localStorage.clear()
           window.location.reload(false);

       }}>Logout</button>
      </div>
      
    
  );
}

export default withRouter(Navbar);
