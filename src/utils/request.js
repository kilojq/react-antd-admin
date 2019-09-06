import axios from 'axios'
import { message, Modal } from 'antd'
import { getToken, removeToken } from '@/utils/token'
import { baseApi } from '@/apis/config'

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // api的base_url
  timeout: 10 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  const token = getToken()
  if (token) {
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    // config.headers['Authorization'] = 'Bearer ' + token
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.error(error)
    if (error.response) {
      if (error.response.status === 401) {
        Modal.warning({
          title: '登录提示',
          content: '你已被登出，请重新登录',
          okText: '重新登录',
          // cancelText: '取消',
          onOk() {
            removeToken()
            window.location.reload()
          }
        })
      }

      if (error.response.data.code !== undefined) {
        message.error('Code: ' + error.response.data.code + ' Message: ' + getErrorMsg(error.response.data), 3)
      }
    } else {
      message.error(error.message, 3)
    }
    return Promise.reject(error)
  }
)

function getErrorMsg(data) {
  if (data.errors === undefined) {
    return data.msg
  } else if (!data.errors.message) {
    return data.errors.message ? data.errors.message : data.msg
  }
  const v = getObjectFirstValue(data.errors)
  if (typeof v === 'object') {
    return getObjectFirstValue(v)
  }
  return '网络错误'
}

function getObjectFirstValue(object) {
  return object[Object.keys(object)[0]]
}

export default service
