import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        // Check if authenticated
        auth.isAuthenicated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propType = {
  auth: PropTypes.object.isRequired
};

const mapStatToProps = state => ({
  auth: state.auth
});

export default connect(mapStatToProps)(PrivateRoute);
