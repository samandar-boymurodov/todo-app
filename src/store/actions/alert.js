import * as actionTypes from "./actionTypes";

export const setAlert = (message, type) => {
  return {
    type: actionTypes.SET_ALERT,
    payload: {
      message,
      type,
    },
  };
};

export const removeAlert = () => ({
  type: actionTypes.REMOVE_ALERT,
});
