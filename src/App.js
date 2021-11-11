import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from 'containers/shared/Auth/PageNotFound/PageNotFound';
import { adminRoutes, clientRoutes } from 'routes';
import ClientLayouts from 'layouts/ClientLayouts';
import AdminLayouts from 'layouts/AdminLayouts';

function App() {
  const renderLayouts = (routes, Layout) => {
    return routes.map(route => {
      const { path, component, exact, isPrivate } = route;
      return <Layout
        path={path}
        component={component}
        exact={exact}
        isPrivate={isPrivate}
      />
    })
  }
  return (
    <div className='App'>
      <Router>
        <Switch>
          {renderLayouts(clientRoutes, ClientLayouts)}
          {renderLayouts(adminRoutes, AdminLayouts)}
          <Route path='*' exact component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
