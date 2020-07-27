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

  useEffect(() => {
    const id = match.params.id;

    if (id) {
      const currentTodo = detectCurrentTodo(id, todos);

      setTodo(currentTodo);
    }
  }, [match.params.id, todos]);

  function detectCurrentTodo(id, todos) {
    return todos.find((task) => task.id === id);
  }

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
