import React from 'react';
import PropTypes from 'prop-types';

import { detect } from '../utils/utils';

import useStore from '../hooks/useStore';
import { getId, getTodosList } from '../getters/getters';

import TodoForm from '../components/TodoForm';

import s from './TodoDetails.module.scss';

export default function TodoDetails({ match }) {
  const id = getId(match);
  const { state: currentTodo } = useStore(
    state => getTodosList(state),
    () => {},
    detect(id)
  );

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
