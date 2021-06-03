import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { theme } from "./UI/theme";
import Register from "./UI/Register";
import Login from "./UI/Login";
import ToDoGroupsContainer from "./Components/ToDoGroupsContainer";
import Fonts from "./UI/Fonts";
import { connect } from "react-redux";
import { removeAlert } from "./store/actions/index";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App({ open, message, type, onCloseAlert }) {
  React.useEffect(() => {
    Fonts();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={ToDoGroupsContainer} />
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
          {message}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
