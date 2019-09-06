import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from 'react-router-dom'
import { Form, Input, Icon, Button, message } from 'antd'
import './login.less'

import { getToken, setToken } from '@/utils/token'
import { loginByUsername, getUserInfo } from '@/apis/login'
import { SET_TOKEN, SET_USERINFO } from '@/store/ActionTypes'

const LoginForm = ({ form, history, location }) => {
  const { getFieldDecorator } = form
  const token = getToken()
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(token)
    if (token) {
      dispatch({ type: SET_TOKEN, token: token })
      _getUserInfo()
    }
  })

  const _getUserInfo = () => {
    getUserInfo().then(res => {
      dispatch({ type: SET_USERINFO, userinfo: { ...res.data.data } })
      if (location.state && location.state.referrer) {
        history.replace(location.state.referrer)
      } else {
        history.replace('/dashboard')
      }
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        loginByUsername(values.username.trim(), values.password).then(res => {
          if (res.data.code === 0) {
            const token = res.data.data.token
            // console.log(res)
            dispatch({ type: SET_TOKEN, token: token })
            setToken(token)
            _getUserInfo()
          } else {
            message.error(res.data.msg, 3)
          }
        })
      }
    })
  }

  return (
    token ? null :
    <div className="login-container">
      <Form className="login-form" onSubmit={ handleSubmitForm }>
        <div className="login-title">
          <h3>System Login</h3>
        </div>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              allowClear
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              allowClear
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">Log in</Button>
        </Form.Item>
        <Form.Item>
          <p style={{ color: '#ddd' }}>账号与密码： admin / admin， guest / guest， editor / editor</p>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Form.create()(withRouter(LoginForm))
