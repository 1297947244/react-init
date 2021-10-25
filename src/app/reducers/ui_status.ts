const defaultState = {
  viewChangeCounter: 0,
  homePageLoaded: false,
  showMenu: false,
};

export default (state = defaultState, action:any) => {
  switch (action.type) {
    case "UI_SHOW_MENU":
      return { ...state, showMenu: action.payload.showMenu };
    case "HOME_PAGE_LOADED":
      return { ...state, homePageLoaded: action.payload.homePageLoaded };
    case "VIEW_CHANGE_COUNTER":
      return { ...state, viewChangeCounter: action.payload.viewChangeCounter }
    default:
      return state;
  }
};
