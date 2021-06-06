import * as actionTypes from "../actions/actionTypes";
const initialState = {
  todoGroups: [],
  selectedTodoGroup: { todos: [] },
};

export const todoReducer = (state = initialState, action) => {
  const { todos } = action;

  switch (action.type) {
    case actionTypes.INIT_TODOS:
      return {
        ...state,
        todoGroups: todos,
      };
    case actionTypes.SELECT_TODOGROUP:
      return {
        ...state,
        selectedTodoGroup: action.todoGroup,
      };
    case actionTypes.ADD_GROUP:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.EDIT_GROUP:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.DELETE_GROUP:
      console.log(action.newToDoGroups);
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    default:
      return state;
  }
};
