import React from 'react';

import { isEmpty } from '../utils/utils';

import useStore from '../hooks/useStore';
import {
  createTodo,
  updateTodo,
  deleteTodo,

  logOut,

  showModal,
  closeModal
} from '../actions/actions';
import {
  getUser,
  getTodosList,
  checkEditMode,
  getDefaultFormText,
  getRemoveBtnTitle,
  getSignOutBtnTitle,
  getModalSettings
} from '../getters/getters';

import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import Sidebar from '../components/Sidebar';

import s from './Home.module.scss';

export default function Home() {
  const { state, actions } = useStore(state => state,
    {
      createTodo,
      updateTodo,
      deleteTodo,

      logOut,

      showModal,
      closeModal
    });
  const user = getUser(state);
  const isAuth = !isEmpty(user);
  const todos = getTodosList(state);
  const defaultFormText = getDefaultFormText(state);
  const removeBtnTitle = getRemoveBtnTitle(state);
  const signOutBtnTitle = getSignOutBtnTitle(state);
  const modalSettings = getModalSettings(state);

  function displayModal(settings) {
    actions.showModal(settings);
    setTimeout(actions.closeModal, 1500);
  }

  function handleSubmit({ todoId, title, mode }) {
    const now = Date.now();
    const isEditMode = checkEditMode({ mode });
    const settings = modalSettings[mode];

    if (isEditMode) {
      actions.updateTodo(todoId, { title });
      return displayModal(settings);
    }

    actions.createTodo({ title, userId: user.uid, createdAt: now });
    displayModal(settings);
  }

  function handleChange(todoId, status) {
    actions.updateTodo(todoId, { isCompleted: status });
  }

  function handleDelete(todoId) {
    const settings = modalSettings['delete'];

    actions.deleteTodo(todoId);
    displayModal(settings);
  }

  return (
    isAuth && (
      <div className={s.container}>
        <Sidebar
          user={user}
          signOutBtnTitle={signOutBtnTitle}
          onLogOut={logOut}
        />

        <TodoForm
          onSubmit={handleSubmit}
          mode="create"
          defaultFormText={defaultFormText}
        />

        <TodoList
          todos={todos}
          onUpdate={handleSubmit}
          onDelete={handleDelete}
          onChangeStatus={handleChange}
          removeBtnTitle={removeBtnTitle}
        />
      </div>
    )
  );
}
