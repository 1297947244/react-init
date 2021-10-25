const defaultState = {
  infoList: [],
};

export default (state = defaultState, action:any) => {
  switch (action.type) {
    case "HOME_SET_INFO_LIST":
      return { ...state, infoList: action.payload.infoList };
    default:
      return state;
  }
};
