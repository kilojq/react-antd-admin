import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook';
import screenfull from 'screenfull'

import { getLevelPathList } from '@/utils'
import { routeMap } from '@/routes/config'
import { Layout, Icon, Breadcrumb, Menu } from 'antd'
import avatar from '@/assets/logo.svg'
const { Header } = Layout
const { SubMenu, Item } = Menu

export default withRouter(({ location }) => {
  // console.log(location)
  const pathList = getLevelPathList(location.pathname)
  const menuCollapsed = useMappedState(state => state.app.menuCollapsed)
  const dispatch = useDispatch()
  const switchMenuState = () => {
    dispatch({ type: 'SWITCH_MENU_STATE', menuCollapsed: !menuCollapsed })
  }

  const handleSwitchFullscreen = () => {
    screenfull.toggle()
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
      </div>
      <Menu
        className="settings-menu"
        mode="horizontal"
        theme="dark"
        selectable={ false }
      >
        <Item key="fullscreen" onClick={ handleSwitchFullscreen }>
          <Icon type="fullscreen"></Icon>
        </Item>
        <SubMenu title={
          <span className="avatar"><img src={ avatar } alt="头像" /></span>
        }>
          <Item>
            <Icon type="logout"></Icon>
            <span>退出登录</span>
          </Item>
        </SubMenu>
      </Menu>
    </Header>
  )
})
