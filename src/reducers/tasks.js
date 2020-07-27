import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO
} from '../actions/actions';

const initialState = { todos: [] };

const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: [...payload.todos]
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, payload.todo]
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === payload.todo.id
          ? { ...todo, ...payload.todo }
          : todo))
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.todoId)
      };

    default:
      return state;
  }
};

export default todos;
