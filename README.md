# react-week-scheduler
> responsive graphical weekly scheduler component with drag/expand functionality to fill time blocks

## Install

```console
$ npm install react-week-scheduler
```

## Usage

```js
import WeeklyScheduler from 'react-week-scheduler';
import 'react-week-scheduler/react-week-scheduler.css';
```

### Properties

```js
return (
  <div>
    <WeeklyScheduler
      defaultEvent={startingDefault} selectedEvent={blockingEvent} events={eventList}
      currentSchedule={currentSchedule}
      ref={(scheduler) => { this.scheduler = scheduler; }}
    />
  </div>
);
```
Event objects follow the format: { event: 'myEventName', color '#999'}. Any format of CSS color string including hsl should be valid.

`defaultEvent` - event that by default will fill the week

`selectedEvent` - default event selected for filling scheduler

`events` - array of events to select from to fill scheduler

`currentSchedule` - 7 x 96 timeblock matrix corresponding to 7 weekdays and 96 15-minute blocks per day. Stores Event objects.

### Accessing Scheduler state

To access and return current Scheduler state just use a `ref` callback:

  `ref={(scheduler) => { this.scheduler = scheduler }}`

Current timeblock matrix will be stored in `this.scheduler.state.days` corresponding to above ref

##Demo

  (https://wrleskovec.github.io/react-week-scheduler/)
