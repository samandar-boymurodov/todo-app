import axios from "axios";
import * as actionTypes from "./actionTypes";
import { selectTodoGroup } from "../actions/index";

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

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  dispatch({
    type: actionTypes.LOGOUT,
  });
  dispatch(selectTodoGroup(-1, []));
};

export const checkAuthTimeOut = (expirationTime) => (dispatch) => {
  console.log(expirationTime);
  setTimeout(() => {
    dispatch(logout);
  }, expirationTime * 1000);
};

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

      // Saving token and expiration date to control autologin and logout
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeOut(response.data.expiresIn));
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

      // Saving token and expiration date to control autologin and logout
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeOut(response.data.expiresIn));
      dispatch(setAlert("Successfully signed in!", "success"));
    })
    .catch((error) => {
      console.log(error.response.data.error.message);
      dispatch(authFail(error.response.data.error.message));
      dispatch(setAlert("Something went wrong!", "error"));
    });
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(logout);
  } else {
    const expirationDate = localStorage.getItem("expirationDate");
    console.log(expirationDate);
    if (new Date(expirationDate) >= new Date()) {
      dispatch(autoLogin());
    } else {
      dispatch(logout());
    }
  }
};

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");

  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCLDHvRZv8ufkm6vcmWf6xH4oXLBA9x258",
      { idToken: token }
    )
    .then((response) => {
      dispatch({
        type: actionTypes.AUTO_LOGIN,
        authData: {
          idToken: token,
          userId: response.data.users[0].localId,
        },
      });
      dispatch(
        checkAuthTimeOut(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        )
      );
    })
    .catch((error) => {
      console.log(error.response.data.error.message);
      dispatch(logout());
    });
};
