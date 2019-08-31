import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Layout from '@/layouts'
import Unfound from './views/404'
import MainRoutes from './routes'
import { routeMap } from './routes/config'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" push />} />
        <Route exact path={ Object.keys(routeMap) }>
          <Layout>
            <MainRoutes></MainRoutes>
          </Layout>
        </Route>
        <Route path="/404" component={Unfound}></Route>
        <Route component={Unfound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
