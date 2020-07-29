import React from 'react';
import { Redirect } from 'react-router-dom';

import { isEmpty } from '../utils/utils';

import useStore from '../hooks/useStore';
import { logIn, register } from '../actions/actions';
import {
  getUser,
  getError,
  getSignInBtnTitle,
  getRegisterBtnTitle,
  getAuthFormWarning
} from '../getters/getters';

import AuthForm from '../components/AuthForm';

import s from './Auth.module.scss';

export default function Auth() {
  const { state, actions } = useStore(state => state, { logIn, register });
  const user = getUser(state);
  const error = getError(state);
  const signInBtnTitle = getSignInBtnTitle(state);
  const registerBtnTitle = getRegisterBtnTitle(state);
  const authFormWarning = getAuthFormWarning(state);
  const isAuth = !isEmpty(user);

  function handleAuth(data) {
    const { email, password, type } = data;

    switch (type) {
      case 'login':
        return actions.logIn(email, password);
      case 'register':
        return actions.register(email, password);
      default: throw new Error('interrupt');
    }
  }

  return (
    isAuth
      ? <Redirect to="/" />
      : (
        <div className={s.container}>
          {
            error && <div className={s.notification}>{error.message}</div>
          }

          <AuthForm
            signInBtnTitle={signInBtnTitle}
            registerBtnTitle={registerBtnTitle}
            authFormWarning={authFormWarning}
            onAuth={handleAuth}
          />
        </div>
      )
  );
}
