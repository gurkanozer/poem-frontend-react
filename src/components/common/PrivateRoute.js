import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loading />;
      } else if (!auth.isAuthenticated) {
        <Redirect
          to={{
            pathname: "/login",
            state: { referrer: props.location },
          }}
        />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
