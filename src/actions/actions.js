import * as api from '../api/api';

export const GET_TODOS = 'GET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

/* Auth */

export function initAuth() {
  return (dispatch) => api.initAuth((user) => {
    if (user) {
      return dispatch({
        type: LOGIN_USER,
        payload: {
          user
        }
      });
    }
    return dispatch({
      type: LOGOUT_USER
    });
  });
}

export function logIn(email, password) {
  return async (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
      payload: { loading: true }
    });

    const data = await api.signIn(email, password)
      .then(() => dispatch({
        type: HIDE_LOADER,
        payload: { loading: false }
      }));

    return data;
  };
}

export function logOut() {
  return api.signOut().then(() => {});
}

export function register(email, password) {
  return async (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
      payload: { loading: true }
    });

    const data = await api.register(email, password)
      .then(() => dispatch({
        type: HIDE_LOADER,
        payload: { loading: false }
      }));

    return data;
  };
}

/* Tasks */

export async function getTodos(userId) {
  const todosList = await api.getTodos(userId)
    .then((todos) => ({
      type: GET_TODOS,
      payload: {
        todos
      }
    }));

  return todosList;
}

export async function createTodo(data) {
  const createdTodo = await api.createTodo(data)
    .then((todo) => ({
      type: CREATE_TODO,
      payload: {
        todo
      }
    }));

  return createdTodo;
}

export async function updateTodo(todoId, data) {
  const updatedTodo = await api.updateTodo(todoId, data)
    .then((todo) => ({
      type: UPDATE_TODO,
      payload: {
        todo
      }
    }));

  return updatedTodo;
}

export async function deleteTodo(id) {
  const deletedTodoId = await api.deleteTodo(id)
    .then((todoId) => ({
      type: DELETE_TODO,
      payload: {
        todoId
      }
    }));

  return deletedTodoId;
}

/* Modal */

export function showModal(settings) {
  return {
    type: SHOW_MODAL,
    payload: { visible: true, settings }
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: { visible: false }
  };
}

/* Loader */

export function showLoader() {
  return {
    type: SHOW_LOADER,
    payload: { loading: true }
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
    payload: { loading: false }
  };
}
