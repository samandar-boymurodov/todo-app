import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./index";
import { random } from "./utils/random";
import { store } from "../store";

export const initTodos = () => (dispatch) => {
  axios
    .get("https://random-word-api.herokuapp.com//word?number=30")
    .then((response) => {
      console.log(response);

      const todos = response.data.map((el) => ({
        name: el,
        todos: [...new Array(20)].map(() => ({
          name: random(response.data),
          description: `${random(response.data)} ${random(response.data)}`,
        })),
      }));
      dispatch({
        type: actionTypes.INIT_TODOS,
        todos: todos,
      });
    })
    .catch((error) => {
      setAlert("Something went wrong!", "error");
    });
};

export const selectTodoGroup = (index, todoGroups) => {
  return {
    type: actionTypes.SELECT_TODOGROUP,
    todoGroup: todoGroups[index],
  };
};

export const addTodoGroup = (name) => {
  const newToDoGroups = [
    {
      name: name,
      todos: [],
    },
    ...store.getState().todo.todoGroups,
  ];

  return {
    type: actionTypes.ADD_GROUP,
    newToDoGroups,
  };
};
