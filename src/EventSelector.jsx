import React from 'react';

export default function EventSelector({ events, selectedEvent, selectEvent }) {
  const onRadioClick = eventSelected => () => {
    selectEvent(eventSelected);
  };
  return (
    <fieldset id="EventSelector">
      <legend>Events: </legend>
      <div className="legend-body">
        {events.map(event => (
          <div className="radio-item" key={event.event}>
            <label className="radio-label" htmlFor={`eventSelect${event.event}`}>
              <input
                type="radio"
                name="eventSelect"
                id={`eventSelect${event.event}`}
                value={event.event}
                defaultChecked={selectedEvent.event === event.event}
                onClick={onRadioClick(event)}
              />
              {event.event}
            </label>
            <div className="legend-color" style={{ backgroundColor: event.color }} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
