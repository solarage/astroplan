import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useStore from '../hooks/useStore';
import { getTodosList } from '../getters/getters';

import TodoForm from '../components/TodoForm';

import s from './TodoDetails.module.scss';

export default function TodoDetails({ match }) {
  const [currentTodo, setTodo] = useState();
  const { state } = useStore(state => state.tasks, () => {});
  const todos = getTodosList(state);

  function detectCurrentTodo(id, tasks) {
    return tasks.find((task) => task.id === id);
  }

  useEffect(() => {
    const { params: { id } } = match;

    if (id) {
      const todo = detectCurrentTodo(id, todos);

      setTodo(todo);
    }
  }, [match.params.id, todos]);

  return (
    <div className={s.container}>
      {
        currentTodo && (
          <TodoForm
            mode="display"
            {...currentTodo}
          />
        )
      }
    </div>
  );
}

TodoDetails.propTypes = {
  match: PropTypes.object.isRequired
};
