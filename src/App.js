import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import { theme } from "./UI/theme";
import Register from "./UI/Register";
import Login from "./UI/Login";
import ToDoGroupsContainer from "./Components/ToDoGroupsContainer";
import Fonts from "./UI/Fonts";

function App() {
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
    </ThemeProvider>
  );
}

export default App;
