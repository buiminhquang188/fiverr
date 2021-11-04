import React from 'react';
import { Route } from 'react-router-dom';

const withLayout = WrappedComponent => {
  return ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={routeProps => (
        <WrappedComponent>
          <Component {...routeProps}/>
        </WrappedComponent>
      )}
    />
  );
};

export default withLayout;