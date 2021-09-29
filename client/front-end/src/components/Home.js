import React, { Component, useContext } from "react";
import { UserContext } from "./UserContext";
import Main from "./Main";
function Home() {
  return (
    <UserContext.Consumer>
     
      {({ user, setUser }) =><Main user={user} / >}
    </UserContext.Consumer>
  );
}

export default Home;
