import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useStore from '../hooks/useStore';
import { closeModal } from '../actions/actions';

import {
  getVisibility, getType, getTitle, getMessage
} from '../getters/getters';

import s from './Modal.module.scss';

export default function Modal() {
  const { state, actions } = useStore(state => state.modal, { closeModal });
  const isVisible = getVisibility(state);
  const type = getType(state);
  const title = getTitle(state);
  const message = getMessage(state);

  return (
    <CSSTransition
      in={isVisible}
      timeout={{
        enter: 500,
        exit: 350
      }}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <div className={s.wrapper}>
        <div className={`${s.container} ${s[type]}`}>
          <button
            onClick={actions.closeModal}
            className={s.close_btn}
            type="button"
            alt="close"
          />

          <div className={s.title}>{title}</div>
          <div className={s.message}>{message}</div>
        </div>

        <div onClick={actions.closeModal} className={s.backdrop} />
      </div>
    </CSSTransition>
  );
}
