import React from 'react'

export default ({ location }) => {
  const content = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)
  return <div style={ { position: 'absolute', left: '50%', top: '50%' } }>{ content }</div>
}