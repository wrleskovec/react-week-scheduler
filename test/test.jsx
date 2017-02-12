import React from 'react';
import { render } from 'react-dom';
import WeeklyScheduler from '../src/WeeklyScheduler';
import '../react-week-scheduler.css';

const startingDefault = { event: 'default', color: '#d4d8dd' };
const blockingEvent = { event: 'block', color: '#b66363' };
const limitingEvent = { event: 'limit', color: '#d6bd43' };
const eventList = [startingDefault, blockingEvent, limitingEvent];

render(
  <WeeklyScheduler
    defaultEvent={startingDefault} selectedEvent={blockingEvent} events={eventList}
  />,
  document.getElementById('WeeklyScheduler')
);
