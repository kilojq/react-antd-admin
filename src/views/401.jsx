import React from 'react'
import { Icon } from 'antd'
import './404.less'

export default (props) => {
  return (
    <div className="unfound">
      <Icon type="meh-o" />
      <h1>401 你没有权限访问当前页面，请联系管理员授权！</h1>
    </div>
  )
}
