import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./UI/Header";
import Register from "./UI/Register";
import Login from "./UI/Login";
import ToDoGroupsContainer from "./Components/ToDoGroupsContainer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/dashboard" component={ToDoGroupsContainer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={() => <>Not Found!</>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
