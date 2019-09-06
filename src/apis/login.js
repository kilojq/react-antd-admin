import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(data) {
  return request({
    url: '/user',
    method: 'get',
    params: data
  })
}
