import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {
  Snackbar,
  Typography,
  SnackbarContent,
  IconButton,
} from "@material-ui/core";
import { theme } from "./UI/theme";
import Register from "./UI/Register";
import Login from "./UI/Login";
import ToDoGroupsContainer from "./Components/ToDoGroupsContainer";
import Fonts from "./UI/Fonts";
import { connect } from "react-redux";
import { removeAlert, checkAuthState } from "./store/actions/index";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { green, red, cyan } from "@material-ui/core/colors";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
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
        autoHideDuration={1500}
        TransitionComponent={TransitionUp}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <SnackbarContent
          style={{
            borderRadius: 0,
            backgroundColor:
              type === "success" || type === "info" ? green[500] : red[500],
          }}
          message={
            <Typography variant="body1" style={{ fontFamily: "Raleway" }}>
              {message}
            </Typography>
          }
          action={
            <IconButton size="small" onClick={onCloseAlert}>
              <CloseIcon fontSize="small" style={{ color: "#fff" }} />
            </IconButton>
          }
        ></SnackbarContent>
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
