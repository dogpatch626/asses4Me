import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoutetwo({ component: Component, ...restOfProps }) {
  const user = localStorage.getItem("user");

  console.log("this", user);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoutetwo;