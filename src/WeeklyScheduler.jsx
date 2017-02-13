import React from 'react';
import debounce from 'lodash/debounce';
import DayHeader from './DayHeader';
import TimeRow from './TimeRow';
import EventSelector from './EventSelector';


class WeeklyScheduler extends React.Component {
  constructor(props) {
    super(props);
    const { defaultEvent, selectedEvent, currentSchedule } = this.props;
    let days = [];
    if (currentSchedule) {
      days = currentSchedule;
    } else {
      for (let i = 0; i < 7; i += 1) {
        const day = [];
        for (let j = 0; j < 96; j += 1) {
          day.push(defaultEvent);
        }
        days.push(day);
      }
    }
    this.state = {
      days,
      startingCell: null,
      currentEvent: selectedEvent || defaultEvent,
      oldDays: days
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleSelectEvent = debounce(this.handleSelectEvent.bind(this), 20);
  }

  componentWillReceiveProps(newProps) {
    const { currentSchedule } = this.props;
    const { days } = this.state;
    this.setState({
      days: newProps.currentSchedule || days
    });
  }
  onMouseDown(e) {
    e.preventDefault();
    const rowNum = e.target.getAttribute('data-row');
    const dayNum = e.target.getAttribute('data-day');
    console.log(`row: ${rowNum}, day: ${dayNum}`);
    this.setState({
      startingCell: {
        day: parseInt(dayNum, 10),
        time: parseInt(rowNum, 10)
      }
    });
    this.weekTable.addEventListener('mouseover', this.onMouseOver);
    window.addEventListener('mouseup', this.onMouseUp);
  }
  onMouseUp() {
    const { days } = this.state;
    console.log('MouseUp');
    this.weekTable.removeEventListener('mouseover', this.onMouseOver);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({ oldDays: days });
  }
  onMouseOver(e) {
    const rowNum = e.target.getAttribute('data-row');
    const dayNum = e.target.getAttribute('data-day');
    console.log(`(MouseMove) row: ${rowNum}, day: ${dayNum}`);
    this.handleDragOver(parseInt(dayNum, 10), parseInt(rowNum, 10));
  }
  setupTimeRows() {
    const { days } = this.state;
    const rows = [];
    for (let i = 0; i < 96; i += 1) {
      const row = [];
      for (let j = 0; j < 7; j += 1) {
        row.push(days[j][i]);
      }
      rows.push(row);
    }
    return rows.map((tRow, index) => (
      <TimeRow
        key={index} rowNumber={index} dayItems={tRow}
      />
    ));
  }
  handleSelectEvent(eventSelected) {
    const { currentEvent } = this.state;
    if (eventSelected.event !== currentEvent.event) {
      this.setState({ currentEvent: eventSelected });
    }
  }
  handleDragOver(dayNum, rowNum) {
    const { startingCell, currentEvent, oldDays } = this.state;

    const dayDiff = dayNum - startingCell.day;
    const timeDiff = rowNum - startingCell.time;
    const newDays = [];

    for (let j = 0; j < 7; j += 1) {
      newDays.push(oldDays[j].slice());
    }
    if (dayDiff !== 0) {
      const dayStart = (startingCell.day < dayNum) ? startingCell.day : dayNum;
      const dayEnd = (startingCell.day < dayNum) ? dayNum : startingCell.day;
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = dayStart; j <= dayEnd; j += 1) {
        if (timeDiff !== 0) {
          for (let i = timeStart; i <= timeEnd; i += 1) {
            newDays[j][i] = currentEvent;
          }
        } else {
          newDays[j][startingCell.time] = currentEvent;
        }
      }
    } else if (timeDiff !== 0) {
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = timeStart; j <= timeEnd; j += 1) {
        newDays[startingCell.day][j] = currentEvent;
      }
    }
    this.setState({ days: newDays });
  }
  render() {
    console.log('scheduler renders...');
    const { events, defaultEvent } = this.props;
    const { currentEvent } = this.state;
    return (
      <div id="WeeklySchedulerTable">
        <EventSelector
          events={events} selectedEvent={currentEvent} selectEvent={this.handleSelectEvent}
        />
        <table>
          <DayHeader />
          <tbody
            className="week-table" onMouseDown={this.onMouseDown}
            ref={(tbody) => { this.weekTable = tbody; }}
          >
            {this.setupTimeRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WeeklyScheduler;
