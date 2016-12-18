import React from 'react';
import DayHeader from '~/DayHeader';
import TimeRow from '~/TimeRow';
import _ from 'lodash';

class WeeklyScheduler extends React.Component {
  constructor(props) {
    super(props);
    const days = [];
    const { defaultEvent, selectedEvent } = this.props;
    for (let i = 0; i < 7; i += 1) {
      const day = [];
      for (let j = 0; j < 96; j += 1) {
        day.push(this.stripeShade(j, defaultEvent.color));
      }
      days.push(day);
    }
    this.state = {
      days,
      startingCell: null,
      currentEvent: selectedEvent.color || defaultEvent.color
    };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  // onMouseDown(e) {
  //   e.preventDefault();
  // }

  componentWillMount() {
    this.handleDragOver = _.debounce(this.handleDragOver, 20);
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
        key={index} rowNumber={index} dayItems={tRow} handleDragStart={this.handleDragStart}
        handleDragOver={this.handleDragOver}
      />
    ));
  }
  stripeShade(rowNum, color) {
    if (rowNum % 2 === 0) {
      return {
        backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
      };
    }
    return {
      backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2] - 5}%)`
    };
  }
  handleDragStart(dayNum, rowNum) {
    // const hour = (rowNum === 0) ? 0 : Math.floor(rowNum / 4);
    // const minutes = (rowNum % 4) * 15;
    this.setState({ startingCell: {
      day: dayNum,
      time: rowNum
    } });
  }
  handleDragOver(dayNum, rowNum) {
    const { startingCell, days, currentEvent } = this.state;

    const dayDiff = dayNum - startingCell.day;
    const timeDiff = rowNum - startingCell.time;
    const newDays = [];

    for (let j = 0; j < 7; j += 1) {
      newDays.push(days[j].slice());
    }
    if (dayDiff !== 0) {
      const dayStart = (startingCell.day < dayNum) ? startingCell.day : dayNum;
      const dayEnd = (startingCell.day < dayNum) ? dayNum : startingCell.day;
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = dayStart; j <= dayEnd; j += 1) {
        if (timeDiff !== 0) {
          for (let i = timeStart; i <= timeEnd; i += 1) {
            newDays[j][i] = this.stripeShade(i, currentEvent);
          }
        } else {
          newDays[j][startingCell.time] = this.stripeShade(startingCell.time, currentEvent);
        }
      }
    } else if (timeDiff !== 0) {
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = timeStart; j <= timeEnd; j += 1) {
        newDays[startingCell.day][j] = this.stripeShade(j, currentEvent);
      }
    }
    console.log(newDays);
    this.setState({ days: newDays });
  }
  render() {
    console.log(this.state.days[0]);
    return (
      <table onMouseDown={this.onMouseDown}>
        <DayHeader />
        <tbody>
          {this.setupTimeRows()}
        </tbody>
      </table>
    );
  }
}

export default WeeklyScheduler;
