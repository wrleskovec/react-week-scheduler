import React from 'react';

export default function EventSelector({ events, selectedEvent, selectEvent }) {
  return (
    <fieldset id="EventSelector">
      <legend>Events: </legend>
      {events.map(event => (
        <div className="radio-item">
          <input
            type="radio" name="eventSelect" value={event.event}
            selected={selectedEvent.event === event.event}
          />
          <label className="radio-label" htmlFor={event.event}>{event.event}</label>
        </div>
      ))}
    </fieldset>
  );
}
