import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./index";
import { random } from "./utils/random";
import { store } from "../store";
import { cloneDeep } from "lodash";

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

export const addTodoGroup = (name) => (dispatch) => {
  const isExist = store
    .getState()
    .todo.todoGroups.some((todoGroup) => todoGroup.name === name);
  if (isExist) {
    dispatch(setAlert("Todo Group already exists", "error"));
    return;
  }
  const newToDoGroups = [
    {
      name: name,
      todos: [],
    },
    ...store.getState().todo.todoGroups,
  ];
  dispatch(setAlert("Todo Group successfully added!", "success"));
  dispatch({
    type: actionTypes.ADD_GROUP,
    newToDoGroups,
  });
};

export const addTodo = (name, todoInfo) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);

  const selectedGroup = todoGroups.filter((el) => el.name === name);
  const selectedIndex = todoGroups.findIndex((el) => el.name === name);

  selectedGroup[0].todos.unshift({
    name: todoInfo.name,
    description: todoInfo.description,
  });

  dispatch({
    type: actionTypes.ADD_TODO,
    newToDoGroups: todoGroups,
  });
  dispatch(selectTodoGroup(selectedIndex, todoGroups));

  dispatch(setAlert("Todo successfully added!"));
};

export const editGroup = (index, newName) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);
  const selectedGroup = store.getState().todo.selectedTodoGroup;

  const oldName = todoGroups[index].name;

  todoGroups[index].name = newName;
  dispatch({
    type: actionTypes.EDIT_GROUP,
    newToDoGroups: todoGroups,
  });

  if (selectedGroup.name === oldName) {
    dispatch(selectTodoGroup(index, todoGroups));
  }
};
