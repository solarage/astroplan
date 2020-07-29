import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './AuthForm.module.scss';

export default function AuthForm({
  signInBtnTitle,
  registerBtnTitle,
  authFormWarning,
  onAuth
}) {
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState('');
  const [password, setPassword] = useState('');

  function handleAuthBtnClick(type) {
    const data = { email, password, type };

    if (!email || !password) {
      setWarning(authFormWarning);

      return setTimeout(() => setWarning(''), 1500);
    }

    return onAuth(data);
  }

  return (
    <div className={s.container}>
      { warning && <div className={s.notification}>{warning}</div> }

      <input
        type="email"
        required
        value={email}
        label="e-mail"
        placeholder="E-mail"
        className={s.input}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <input
        type="password"
        required
        value={password}
        label="e-mail"
        placeholder="Password"
        className={s.input}
        onChange={({ target: { value } }) => setPassword(value)}
      />

      <div className={s.auth_actions}>
        <button
          className={s.auth_btn}
          onClick={() => handleAuthBtnClick('login')}
          type="button"
        >
          {signInBtnTitle}
        </button>
        <button
          className={s.auth_btn}
          onClick={() => handleAuthBtnClick('register')}
          type="button"
        >
          {registerBtnTitle}
        </button>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  signInBtnTitle: PropTypes.string,
  registerBtnTitle: PropTypes.string,
  authFormWarning: PropTypes.string,
  onAuth: PropTypes.func
};

AuthForm.defaultProps = {
  signInBtnTitle: 'SignIn',
  registerBtnTitle: 'Register',
  authFormWarning: 'Fill out all required fields',
  onAuth: () => {}
};
