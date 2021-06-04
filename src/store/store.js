import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./reducers/index";

const rootReducer = combineReducers({
  auth: reducers.authReducer,
  alert: reducers.alertReducer,
  todo: reducers.todoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
