import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
