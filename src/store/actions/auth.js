import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (username, email, password) => (dispatch) => {
  dispatch(authStart());
  axios.post("");
  AIzaSyCLDHvRZv8ufkm6vcmWf6xH4oXLBA9x258;
};
