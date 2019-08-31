import React from 'react';
import { withRouter } from 'react-router-dom'
// import { useContext } from 'react';
// import { StoreContext, useMappedState, useDispatch } from 'redux-react-hook';

import Dashboard from '@/views/menu'

export default withRouter((props) => {
  // const store = useContext(StoreContext)
  // const states = store.getState()
  // const themeColor = states.themeColor
  // const mapState = useMappedState(state => state)
  // const dispatch = useDispatch()

  return <Dashboard {...props} />
})
