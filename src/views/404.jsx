import React from 'react'
import { Icon } from 'antd'
import './404.less'

export default (props) => {
  return (
    <div className="unfound">
      <Icon type="frown-o" />
      <h1>404 Not Found</h1>
    </div>
  )
}
