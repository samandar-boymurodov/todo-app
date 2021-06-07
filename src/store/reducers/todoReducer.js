import * as actionTypes from "../actions/actionTypes";
const initialState = {
  todoGroups: [],
  selectedTodoGroup: { todos: [] },
  optionIndexGroup: null,
  optionIndexTodo: null,
  fetchLoading: true,
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
    case actionTypes.EDIT_TODO:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.DELETE_GROUP:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.OPTION_INDEX_GROUP:
      return {
        ...state,
        optionIndexGroup: action.optionGroup,
      };
    case actionTypes.OPTION_INDEX_TODO:
      return {
        ...state,
        optionIndexTodo: action.optionTodo,
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.COMPLETE_TODO:
      return {
        ...state,
        todoGroups: action.newToDoGroups,
      };
    case actionTypes.START_FETCH_LOADING:
      return {
        ...state,
        fetchLoading: true,
      };
    case actionTypes.END_FETCH_LOADING:
      return {
        ...state,
        fetchLoading: false,
      };
    default:
      return state;
  }
};
