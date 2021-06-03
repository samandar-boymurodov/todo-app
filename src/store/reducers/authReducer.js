import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  const { authData } = action;
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        loading: false,
        error: null,
        token: authData.idToken,
        userId: authData.localId,
      };
    case actionTypes.AUTH_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
