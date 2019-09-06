import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useMappedState } from 'redux-react-hook';
import loadable from '@loadable/component'
import DocumentTitle from 'react-document-title'

import Unfound from '@/views/404'
import { routeList as routesConfig, REDIRECT_TO_FIRST_CHILD_ROUTE } from './config'
import { getUserInfo } from '@/apis/login'
import { getToken } from '@/utils/token'
import { hasPermission } from '@/utils/permission'
import { SET_USERINFO } from '@/store/ActionTypes'

export default (props) => {
  let [ isLogin ] = useState(getToken() ? true : false)
  const { username, roles } = useMappedState(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLogin && !username) {
      getUserInfo().then(res => {
        dispatch({ type: SET_USERINFO, userinfo: { ...res.data.data } })
      })
    }
  }, [isLogin, username, dispatch])

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
          : <Route exact key={ route.path } path={ route.path }>
              {
                !isLogin
                  ? <Redirect key={ route.path } from={ route.path } to={{ pathname: '/login', state: { referrer: route.path } }} />
                  : hasPermission(roles, route.meta ? route.meta.permission : null)
                    ? <DocumentTitle title={ `${ route.meta ? route.meta.title + '-' : '' } React Antd Admin` }>
                        <Route component={ loadable(route.component) } />
                      </DocumentTitle>
                    : <Redirect from={ route.path } to="/401" />
              }
            </Route>
      ))}
      <Route component={ Unfound }></Route>
    </Switch>
  )
}
