import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const withLayout = (WrappedComponent) => {
  return ({ component: Component, isPrivate, ...rest }) => {
    window.scrollTo(0, 0);
    const currentUser = useSelector((state) => state.authReducer.currentUser);

    const renderLayout = (
      <Route
        {...rest}
        render={(routeProps) => (
          <WrappedComponent>
            <Component {...routeProps} />
          </WrappedComponent>
        )}
      />
    );
    if (isPrivate) {
      if (currentUser) {
        return renderLayout;
      } else {
        alert("You need to login first");
        return <Redirect to="/login" />;
      }
    }
    return renderLayout;
  };
};

export default withLayout;
