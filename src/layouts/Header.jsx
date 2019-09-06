import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook';
import screenfull from 'screenfull'
import { Layout, Icon, Breadcrumb, Menu } from 'antd'

import { getLevelPathList } from '@/utils'
import { routeMap } from '@/routes/config'
import { logout } from '@/apis/login'
import { removeToken } from '@/utils/token'
import { SWITCH_MENU_STATE } from '@/store/ActionTypes'
const { Header } = Layout
const { SubMenu, Item } = Menu


export default withRouter(({ location }) => {
  // console.log(location)
  const pathList = getLevelPathList(location.pathname)
  const menuCollapsed = useMappedState(state => state.app.menuCollapsed)
  const userinfo = useMappedState(state => state.user)
  const dispatch = useDispatch()
  const switchMenuState = () => {
    dispatch({ type: SWITCH_MENU_STATE, menuCollapsed: !menuCollapsed })
  }

  const handleSwitchFullscreen = () => {
    screenfull.toggle()
  }

  const handleLogout = () => {
    logout().then(() => {
      removeToken()
      window.location.reload()
    })
  }

  return (
    <Header className={ `header fixed ${ menuCollapsed ? 'collapsed' : '' }` }>
      <div className="header__left">
        <Icon
          className="header__menu-switch"
          type={ menuCollapsed ? "menu-unfold" : "menu-fold" }
          onClick={ switchMenuState }
        />
        <Breadcrumb className="header__breadcrumb">
          <Breadcrumb.Item>
            { location.pathname === '/dashboard' ? <span>首页</span> : <Link to='/'>首页</Link> }
          </Breadcrumb.Item>
          { pathList.map((path, index, array) => {
            const route = routeMap[path]
            return (route && 
              <Breadcrumb.Item key={ route.path }>
                {route.meta.icon ? (
                  <Icon type={route.meta.icon} style={{ marginRight: 4 }} />
                ) : null}
                {index === array.length - 1 || route.redirect === 'noRedirect'
                  ? <span>{ route.meta.title }</span>
                  : <Link to={ route.path }>{ route.meta.title }</Link>}
              </Breadcrumb.Item>
            )
          }) }
        </Breadcrumb>
      </div>
      <Menu
        className="settings-menu"
        mode="horizontal"
        theme="dark"
        selectable={ false }
      >
        <Item key="fullscreen" onClick={ handleSwitchFullscreen } title="全屏显示">
          <Icon type="fullscreen"></Icon>
        </Item>
        <SubMenu title={
          <span className="avatar"><img src={ userinfo.avatar } alt="user avatar" /></span>
        }>
          <Item onClick={ handleLogout }>
            <Icon type="logout"></Icon>
            <span>退出登录</span>
          </Item>
        </SubMenu>
      </Menu>
    </Header>
  )
})
