import Mock from 'mockjs'
import loginAPI from './login'

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/auth\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/auth\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user/, 'get', loginAPI.getUserInfo)

export default Mock
