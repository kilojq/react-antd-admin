import React from 'react';

import { Layout} from 'antd'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import './Layout.less'

const { Content } = Layout

export default ({ children }) => {
  return (
    <Layout className="layout">
      <Sidebar></Sidebar>
      <Layout>
        <Header />
        <Content className="main">{ children }</Content>
        <Footer />
      </Layout>
    </Layout>
  )
}
