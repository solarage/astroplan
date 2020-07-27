import React from 'react';
import PropTypes from 'prop-types';

import TodoForm from './TodoForm';

import s from './TodoList.module.scss';

const TodoList = ({ todos, onUpdate, ...other }) => (
  <div className={s.container}>
    <div className={s.list}>
      {todos.map(
        ({ ...todos }) =>
          <TodoForm 
            {...todos}
            {...other}
            key={todos.id}
            onSubmit={onUpdate}
            mode="edit"
          />
      )}
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.array,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeStatus: PropTypes.func
};

TodoList.defaultProps = {
  todos: [],
  onUpdate: () => {},
  onDelete: () => {},
  onChangeStatus: () => {}
};

export default TodoList;
