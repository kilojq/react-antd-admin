import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useMappedState } from 'redux-react-hook';
import { resolve } from 'path'
import { getLevelPathList } from '@/utils'
import { constantRouters as routes} from '@/routes/config'
import { Layout, Menu, Icon } from 'antd';
import logo from '@/assets/logo.svg';
const { Sider } = Layout
const { SubMenu, Item } = Menu;

const renderMenuItemComponent = (route, parentPath = '') => {
  const _path = resolve(parentPath, route.path)
  return route.hidden ? null : (
    <Item key={ _path }>
      <Link to={ _path }>
        <Icon type={ route.meta.icon } />
        <span>{ route.meta.title }</span>
      </Link>
    </Item>
  )
}

const renderSubMenuComponent = (route, parentPath = '') => {
  const _path = resolve(parentPath, route.path)
  return route.hidden ? null : (
    <SubMenu
      key={ _path }
      title={
        <span>
          <Icon type={ route.meta.icon } />
          <span>{ route.meta.title }</span>
        </span>
      }
    >
      {route.children.map(childRoute => childRoute.children ? renderSubMenuComponent(childRoute, _path) : renderMenuItemComponent(childRoute, _path))}
    </SubMenu>
  )
}

export default withRouter(({ location, history }) => {
  const menuCollapsed = useMappedState(state => state.app.menuCollapsed)
  const { pathname } = location;
  const [ selectedKey, setSelectedKey ] = useState(pathname)
  const [ openKeys, setOpenKeys ] = useState(getLevelPathList(pathname))
  
  const handleClickMenu = (e) => {
    setSelectedKey(e.key)
  }
  
  const handleOpenChange = (e) => {
    setOpenKeys(e)
  }

  useEffect(() => {
    if (menuCollapsed) {
      handleOpenChange([])
    }
    const unlistenHistory = history.listen(route => {
      handleClickMenu({ key: route.pathname })
      handleOpenChange(getLevelPathList(route.pathname))
    })
    return () => {
      unlistenHistory()
    }
  }, [menuCollapsed, history])
  
  return (
    <Sider
      className="sidebar"
      trigger={null}
      breakpoint="lg"
      style={{ overflowY: 'auto' }}
      collapsed={ menuCollapsed }>
      <div className="logo-wrapper">
        <img src={logo} className="logo" alt="logo" />
        <span hidden={ menuCollapsed }>LOGO</span>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={ [selectedKey] }
        openKeys={ openKeys }
        onClick={ handleClickMenu }
        onOpenChange={ handleOpenChange }
      >
        {routes.map(route => {
          return route.children ? renderSubMenuComponent(route) : renderMenuItemComponent(route)
        })}
      </Menu>
    </Sider>
  )
})
