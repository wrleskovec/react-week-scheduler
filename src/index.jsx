import React from 'react';
import { render } from 'react-dom';
import '~/css/style.css';
import WeeklyScheduler from '~/WeeklyScheduler';

const startingDefault = { event: 'default', color: [215, 12, 85] };
const blockingEvent = { event: 'block', color: [360, 36, 55] };

render(
  <WeeklyScheduler defaultEvent={startingDefault} selectedEvent={blockingEvent} />,
  document.getElementById('WeeklyScheduler')
);
