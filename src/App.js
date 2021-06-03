import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Snackbar, Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { theme } from "./UI/theme";
import Register from "./UI/Register";
import Login from "./UI/Login";
import ToDoGroupsContainer from "./Components/ToDoGroupsContainer";
import Fonts from "./UI/Fonts";
import { connect } from "react-redux";
import { removeAlert, checkAuthState } from "./store/actions/index";

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      style={{
        borderRadius: 0,
      }}
    />
  );
}

function App({ open, message, type, onCloseAlert, tryToSignIn }) {
  useEffect(() => {
    tryToSignIn();
    Fonts();
  }, [tryToSignIn]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" exact component={ToDoGroupsContainer} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={() => <>Not Found!</>} />
        </Switch>
      </BrowserRouter>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity={type} onClose={onCloseAlert}>
          <Typography variant="body1">{message}</Typography>
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  open: state.alert.open,
  message: state.alert.message,
  type: state.alert.type,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseAlert: () => dispatch(removeAlert()),
    tryToSignIn: () => dispatch(checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
