import * as actionTypes from "../actions/actionTypes";

const initialState = {
  type: "",
  message: "",
  open: false,
};

export const alertReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        type: payload.type,
        message: payload.message,
        open: true,
      };
    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
