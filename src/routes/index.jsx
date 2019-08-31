import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import Unfound from '@/views/404'
import { routeList as routesConfig, REDIRECT_TO_FIRST_CHILD_ROUTE } from './config'

export default (props) => {
  return (
    <Switch>
      {routesConfig.map(route => (
        route.children
          ? <Route exact key={ route.path } path={ route.path }>
              { route.redirect
                ? <Redirect key={ route.path } from={ route.path } to={ route.redirect } />
                : REDIRECT_TO_FIRST_CHILD_ROUTE && route.children && route.children.length
                  ? <Redirect key={ route.path } from={ route.path } to={ route.children[0].path } />
                  : <Redirect key={ route.path } from={ route.path } to="/404" />
              }
            </Route>
          : <Route exact key={ route.path } path={ route.path } component={ loadable(route.component) } />
      ))}
      <Route component={Unfound}></Route>
    </Switch>
  )
}
