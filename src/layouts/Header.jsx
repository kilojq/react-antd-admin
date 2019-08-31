import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getLevelPathList } from '@/utils'
import { routeMap } from '@/routes/config'

import { Layout, Icon, Breadcrumb } from 'antd'
const { Header } = Layout

export default withRouter(({ location }) => {
  // console.log(location)
  const pathList = getLevelPathList(location.pathname)
  const menuCollapsed = useMappedState(state => state.menuCollapsed)
  const dispatch = useDispatch()
  const checkMenuState = () => {
    dispatch({ type: 'SWITCH_MENU_STATE', menuCollapsed: !menuCollapsed })
  }

  return (
    <Header className={ `header fixed ${ menuCollapsed ? 'collapsed' : '' }` }>
      <Icon
        className="header__menu-switch"
        type={ menuCollapsed ? "menu-unfold" : "menu-fold" }
        onClick={ checkMenuState }
      />
      <Breadcrumb className="header__breadcrumb">
        <Breadcrumb.Item>
          { location.pathname === '/dashboard' ? <span>首页</span> : <Link to='/'>首页</Link> }
        </Breadcrumb.Item>
        { pathList.map((path, index, array) => (routeMap[path] && 
          <Breadcrumb.Item key={ routeMap[path].path }>
            {routeMap[path].meta.icon ? (
              <Icon type={routeMap[path].meta.icon} style={{ marginRight: 4 }} />
            ) : null}
            {index === array.length - 1
              ? <span>{ routeMap[path].meta.title }</span>
              : <Link to={ routeMap[path].path }>{ routeMap[path].meta.title }</Link>}
          </Breadcrumb.Item>
        )) }
      </Breadcrumb>
    </Header>
  )
})
