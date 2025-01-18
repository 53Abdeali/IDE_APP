import React from "react";
import { redirect as Redirect , Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
}

export default PrivateRoute;
