import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DateBox from './DateBox';

import s from './Sidebar.module.scss';

export default function Sidebar({ user, signOutBtnTitle, onLogOut }) {
  const [visible, setVisibility] = useState(false);

  return (
    <div
      onClick={() => setVisibility(!visible) }
      className={`${s.container} ${s[`visibility_${visible}`]}`}
    >
      <button className={s.display_btn} type="button" alt="settings" />

      {
        user && (
          <div className={s.user_settings}>
            <div className={s.notification}>{user.email}</div>
            <button
              onClick={onLogOut}
              className={s.sign_out_btn}
              type="button"
            >
              {signOutBtnTitle}
            </button>
          </div>
        )
      }

      <div className={s.date_container}>
        <DateBox />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  signOutBtnTitle: PropTypes.string,
  onLogOut: PropTypes.func
};

Sidebar.defaultProps = {
  user: {},
  signOutBtnTitle: 'SignOut',
  onLogOut: () => {},
};
