// import { param2Obj } from '@/utils'
import { getToken } from '@/utils/token'
const userMap = {
  admin: {
    id: 1,
    roles: ['admin'],
    token: 'admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin'
  },
  guest: {
    id: 2,
    roles: ['guest'],
    token: 'guest',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'guest'
  },
  editor: {
    id: 2,
    roles: ['editor'],
    token: 'editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'editor'
  }
}

export default {
  loginByUsername: config => {
    // console.log(config)
    const { username, password } = JSON.parse(config.body)
    const roles = ['admin', 'guest', 'editor']
    const bool = roles.includes(username) && username === password
    return bool ? {
      code: 0,
      msg: 'success',
      data: userMap[username]
    } : {
      code: 1,
      msg: '账号或密码错误！'
    }
  },
  getUserInfo: config => {
    const token = getToken()
    return {
      code: 0,
      data: userMap[token]
    }
  },
  logout: () => ({
    code: 0,
    msg: 'success'
  })
}
