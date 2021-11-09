import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from 'containers/shared/Auth/PageNotFound/PageNotFound';
import { clientRoutes } from 'routes';
import ClientLayouts from 'layouts/ClientLayouts';
import DashBoard from 'containers/admin/DashBoard';

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
          <Route path='/admin' exact component={DashBoard} />
          <Route path='*' exact component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
