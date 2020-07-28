import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import {
  checkDisplayMode,
  checkCreateMode,
  checkEditMode
} from '../getters/getters';

import s from './TodoForm.module.scss';

export default function TodoForm({
  id,
  title,
  isCompleted,
  createdAt,
  mode,
  defaultFormText,
  removeBtnTitle,
  onSubmit,
  onDelete,
  onChangeStatus
}) {
  const [newTitle, setTitle] = useState(title);
  const [todoStatus, setTodoStatus] = useState(isCompleted);
  const [date, setDate] = useState();
  const todoStatusClass = isCompleted ? 'completed' : 'active';
  const isDisplayMode = checkDisplayMode({ mode });
  const isCreateMode = checkCreateMode({ mode });
  const isEditMode = checkEditMode({ mode });

  function transformDate(ms) {
    const transformedDate = `${dayjs(ms).format('DD.MM.YYYY')} 
      ${dayjs(ms).format('HH:mm')}`;

    return transformedDate;
  }

  useEffect(() => {
    if (isDisplayMode) {
      const readableDate = transformDate(createdAt);

      setDate(readableDate);
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!newTitle || title === newTitle) return;

    onSubmit({ todoId: id, title: newTitle, mode });

    if (isCreateMode) setTitle('');
  }

  function handleChange(status) {
    setTodoStatus(status);
    onChangeStatus(id, status);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  }

  return (
    <div className={`${s.container} ${s[mode]} ${s[todoStatusClass]}`}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          placeholder={defaultFormText}
          value={newTitle}
          onChange={({ target: { value } }) => setTitle(value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      </form>

      { isEditMode && (
        <div className={s.edit_elements}>
          <input
            className={s.status}
            type="checkbox"
            checked={todoStatus}
            onChange={({ target: { checked } }) => handleChange(checked)}
          />
          <button
            onClick={() => onDelete(id)}
            className={s.remove_btn}
            type="button"
          >
            {removeBtnTitle}
          </button>
          <NavLink
            to={`/todo/${id}`}
            className={s.details}
            activeClassName="selected"
          >
            <span className={s.dots}>...</span>
          </NavLink>
        </div>
      )}

      { isDisplayMode && (
        <div className={s.extended_data}>
          <div className={s.date}>{date}</div>
          <NavLink
            to="/"
            className={s.backward}
            activeClassName="selected"
          />
        </div>
      )}
    </div>
  );
}

TodoForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  createdAt: PropTypes.number,
  mode: PropTypes.string,
  defaultFormText: PropTypes.string,
  removeBtnTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeStatus: () => {},
};

TodoForm.defaultProps = {
  id: null,
  title: '',
  isCompleted: false,
  createdAt: null,
  mode: 'create',
  defaultFormText: 'Enter your request',
  removeBtnTitle: 'Del',
  onSubmit: () => {},
  onDelete: () => {},
  onChangeStatus: () => {}
};
