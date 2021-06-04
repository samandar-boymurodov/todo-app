import * as actionTypes from "../actions/actionTypes";

const initialState = {
  open: false,
  type: null,
};

export const modalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return {
        open: true,
        type: payload,
      };
    case actionTypes.REMOVE_MODAL:
      return {
        open: false,
        type: null,
      };
    default:
      return state;
  }
};
