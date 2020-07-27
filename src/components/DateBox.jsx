import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import s from './DateBox.module.scss';

export default function DateBox() {
  const [date, setDate] = useState('');

  function updateDate() {
    const dayjsItem = dayjs();
    const today = dayjsItem.format('DD.MM.YYYY');
    const day = dayjsItem.format('dddd');
    const time = dayjsItem.format('HH:mm');

    setDate({ today, day, time });
  }

  useEffect(() => {
    updateDate();
    const timerId = setInterval(updateDate, 10000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.day}>{date.day}</div>
      <div className={s.date}>{date.today}</div>
      <div className={s.time}>{date.time}</div>
    </div>
  );
};