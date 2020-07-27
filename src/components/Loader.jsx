import React from 'react';

import useStore from '../hooks/useStore';
import { getLoading } from '../getters/getters';

import s from './Loader.module.scss';

export default function Loader() {
  const { state } = useStore(state => state.loader, () => {});
  const loading = getLoading(state);

  return (
    loading && (
      <div className={s.container}>
        <div className={s.spinner} />
      </div>
    )
  );
}
