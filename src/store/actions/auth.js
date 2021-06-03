import axios from "axios";
import * as actionTypes from "./actionTypes";

import { setAlert } from "./index";

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

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const register = (username, email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLDHvRZv8ufkm6vcmWf6xH4oXLBA9x258",
      authData
    )
    .then((response) => {
      console.log(response);
      dispatch(authSuccess(response.data));
      dispatch(setAlert("Successfully signed up!", "success"));
    })
    .catch((error) => {
      console.log(error.response.data.error.message);
      dispatch(authFail(error.response.data.error.message));
      dispatch(setAlert("Something went wrong!", "error"));
    });
};

export const login = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLDHvRZv8ufkm6vcmWf6xH4oXLBA9x258",
      authData
    )
    .then((response) => {
      console.log(response);
      dispatch(authSuccess(response.data));
      dispatch(setAlert("Successfully signed in!", "success"));
    })
    .catch((error) => {
      console.log(error.response.data.error.message);
      dispatch(authFail(error.response.data.error.message));
      dispatch(setAlert("Something went wrong!", "error"));
    });
};
