import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import decode from "jwt-decode";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Createpost from "./Createpost";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    // eslint-disable-next-line no-confusing-arrow
    render={props =>
      isAuthenticated() ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/create-post" exact component={Createpost} />
    </Switch>
  </BrowserRouter>
);
