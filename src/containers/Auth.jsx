import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useStore from '../hooks/useStore';
import { logIn, register } from '../actions/actions';
import {
  getUser,
  getSignInBtnTitle,
  getRegisterBtnTitle,
  getAuthFormWarning
} from '../getters/getters';

import AuthForm from '../components/AuthForm';

import s from './Auth.module.scss';

export default function Auth() {
  const [error, setError] = useState('');
  const { state, actions } = useStore(state => state, { logIn, register });
  const user = getUser(state);
  const signInBtnTitle = getSignInBtnTitle(state);
  const registerBtnTitle = getRegisterBtnTitle(state);
  const authFormWarning = getAuthFormWarning(state);

  function handleLogin(email, password) {
    actions.logIn(email, password)
      .catch(error => setError(error.message));
  }

  function handleRegister(email, password) {
    actions.register(email, password)
      .catch(error => setError(error.message));
  }

  return (
    user
      ? <Redirect to="/" />
      : (
        <div className={s.container}>
          {
            error && <div className={s.notification}>{error}</div>
          }

          <AuthForm
            signInBtnTitle={signInBtnTitle}
            registerBtnTitle={registerBtnTitle}
            authFormWarning={authFormWarning}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      )
  );
}
