const UPDATE_THEME_COLOR = 'UPDATE_THEME_COLOR'
const SWITCH_MENU_STATE = 'SWITCH_MENU_STATE'

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
