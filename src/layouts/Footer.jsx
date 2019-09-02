import React from 'react';
import { Layout } from 'antd'
const { Footer } = Layout

export default ({ children }) => {
  return (
    <Footer className="footer">
      <div className="copyright">© copyright</div>
    </Footer>
  )
}
