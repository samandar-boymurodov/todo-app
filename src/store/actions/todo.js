import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./index";
import { random } from "./utils/random";
import { store } from "../store";
import { cloneDeep } from "lodash";

export const initTodos = () => (dispatch) => {
  axios
    .get("https://random-word-api.herokuapp.com//word?number=20")
    .then((response) => {
      console.log(response);

      const todos = response.data.map((el) => ({
        name: el,
        id: "_" + Math.random().toString(36).substr(2, 9),
        todos: [...new Array(15)].map(() => ({
          name: random(response.data),
          description: `${random(response.data)} ${random(response.data)}`,
          completed: false,
          id: "_" + Math.random().toString(36).substr(2, 9),
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

export const selectTodoGroup = (id, todoGroups) => {
  const groupIndex = todoGroups.findIndex((e) => e.id === id);
  return {
    type: actionTypes.SELECT_TODOGROUP,
    todoGroup: id < 0 ? { todos: [] } : todoGroups[groupIndex],
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
      id: "_" + Math.random().toString(36).substr(2, 9),
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
  console.log(name, todoInfo);
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);

  const selectedGroup = todoGroups.filter((el) => el.name === name);
  const selectedIndex = todoGroups.findIndex((el) => el.name === name);

  selectedGroup[0].todos.unshift({
    name: todoInfo.name,
    description: todoInfo.description,
    completed: false,
    id: "_" + Math.random().toString(36).substr(2, 9),
  });

  dispatch({
    type: actionTypes.ADD_TODO,
    newToDoGroups: todoGroups,
  });
  dispatch(selectTodoGroup(selectedGroup[0].id, todoGroups));

  dispatch(setAlert("Todo successfully added!"));
};

export const editGroup = (id, newName) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);
  const selectedGroup = store.getState().todo.selectedTodoGroup;
  const groupIndex = todoGroups.findIndex((e) => e.id === id);

  const oldName = todoGroups[groupIndex].name;

  todoGroups[groupIndex].name = newName;
  dispatch({
    type: actionTypes.EDIT_GROUP,
    newToDoGroups: todoGroups,
  });

  if (selectedGroup.name === oldName) {
    dispatch(selectTodoGroup(id, todoGroups));
  }
};

export const deleteGroup = (id) => (dispatch) => {
  const todoGroups = store.getState().todo.todoGroups;
  const selectedGroup = store.getState().todo.selectedTodoGroup;
  const groupIndex = todoGroups.findIndex((e) => e.id === id);

  const newToDoGroups = todoGroups.filter(
    (e) => e.name !== todoGroups[groupIndex].name
  );

  dispatch({
    type: actionTypes.DELETE_GROUP,
    newToDoGroups,
  });

  if (selectedGroup.name === todoGroups[groupIndex].name) {
    dispatch(selectTodoGroup(-1, todoGroups));
  }
  dispatch(setAlert("Todo Group successfully removed"));
};

export const optionIndexGroup = (id) => {
  return {
    type: actionTypes.OPTION_INDEX_GROUP,
    optionGroup: id,
  };
};

export const optionIndexTodo = (id) => {
  return {
    type: actionTypes.OPTION_INDEX_TODO,
    optionTodo: id,
  };
};

export const editTodo = (id, editInfo) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);
  const groupIndex = todoGroups.findIndex(
    (group) => group.name === store.getState().todo.selectedTodoGroup.name
  );
  const todoIndex = todoGroups[groupIndex].todos.findIndex(
    (todo) => todo.id === id
  );
  todoGroups[groupIndex].todos[todoIndex].name = editInfo.name;
  todoGroups[groupIndex].todos[todoIndex].description = editInfo.description;

  dispatch(selectTodoGroup(todoGroups[groupIndex].id, todoGroups));

  dispatch({
    type: actionTypes.EDIT_TODO,
    newToDoGroups: todoGroups,
  });
};

export const deleteTodo = (id) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);
  const groupIndex = todoGroups.findIndex(
    (group) => group.name === store.getState().todo.selectedTodoGroup.name
  );

  const todoIndex = todoGroups[groupIndex].todos.findIndex(
    (todo) => todo.id === id
  );

  todoGroups[groupIndex].todos.splice(todoIndex, 1);

  dispatch({
    type: actionTypes.DELETE_TODO,
    newToDoGroups: todoGroups,
  });
  dispatch(selectTodoGroup(todoGroups[groupIndex].id, todoGroups));
  dispatch(setAlert("Todo sucessfully removed"));
};

export const toggleComplete = (id, groupName) => (dispatch) => {
  const todoGroups = cloneDeep(store.getState().todo.todoGroups);
  const groupIndex = todoGroups.findIndex((e) => e.name === groupName);

  const todoIndex = todoGroups[groupIndex].todos.findIndex(
    (todo) => todo.id === id
  );

  if (todoGroups[groupIndex].todos[todoIndex].completed) {
    todoGroups[groupIndex].todos[todoIndex].completed = false;
  } else {
    todoGroups[groupIndex].todos[todoIndex].completed = true;
  }

  dispatch({
    type: actionTypes.COMPLETE_TODO,
    newToDoGroups: todoGroups,
  });
  dispatch(selectTodoGroup(todoGroups[groupIndex].id, todoGroups));
};
