import React from 'react';

export default function EventSelector({ events, selectedEvent, selectEvent }) {
  const onRadioClick = eventSelected => (e) => {
    selectEvent(eventSelected);
  };
  return (
    <fieldset id="EventSelector">
      <legend>Events: </legend>
      <div className="legend-body">
        {events.map(event => (
          <div className="radio-item">
            <input
              type="radio" name="eventSelect" value={event.event}
              checked={selectedEvent.event === event.event} key={event.event}
              onClick={onRadioClick(event)}
            />
            <label className="radio-label" htmlFor={event.event}>{event.event}</label>
            <div className="legend-color" style={{ backgroundColor: event.color }} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
