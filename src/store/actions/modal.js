import * as actionTypes from "./actionTypes";

export const setModal = (type) => ({
  type: actionTypes.SET_MODAL,
  payload: type,
});

export const removeModal = () => ({
  type: actionTypes.REMOVE_MODAL,
});
