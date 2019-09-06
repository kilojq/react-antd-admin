import { getToken } from '@/utils/token'

import { SET_TOKEN, SET_USERINFO, SET_USERNAME, SET_AVATAR, SET_ROLES } from '../ActionTypes'

const _state = {
  id: undefined,
  token: getToken(),
  username: '',
  avatar: '',
  roles: [],
  isLogin: false
}

export default function(state = _state, action) {
  switch (action.type) {
    case SET_TOKEN: return { ...state, token: action.token };
    case SET_USERINFO: return {
      ...state,
      id: action.userinfo.id,
      username: action.userinfo.username,
      avatar: action.userinfo.avatar,
      roles: action.userinfo.roles
    };
    case SET_USERNAME: return { ...state, username: action.username }
    case SET_AVATAR: return { ...state, avatar: action.avatar }
    case SET_ROLES: return { ...state, roles: action.roles }
    default: return state;
  }
}
