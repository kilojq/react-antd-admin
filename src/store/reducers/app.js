import { UPDATE_THEME_COLOR, SWITCH_MENU_STATE } from '../ActionTypes'

export default function(state, action) {
  if (!state) {
    return {
      themeColor: 'black',
      menuCollapsed: false
    }
  }

  switch (action.type) {
    case UPDATE_THEME_COLOR: return { ...state, themeColor: action.themeColor };
    case SWITCH_MENU_STATE: return { ...state, menuCollapsed: action.menuCollapsed };
    default: return state;
  }
}
