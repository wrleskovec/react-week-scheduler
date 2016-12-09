import React from 'react';
import QuarterCell from '~/QuarterCell';

const { PropTypes, Component } = React;

class TimeRow extends Component {

  static propTypes = {
    rowNumber: PropTypes.number,
    dayItems: PropTypes.arrayOf(PropTypes.shape({
      backgroundColor: PropTypes.string
    })),
    handleDragStart: PropTypes.func,
    handleDragOver: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
  }
  dragStartHandler(dayNum) {
    const { handleDragStart, rowNumber } = this.props;
    handleDragStart(dayNum, rowNumber);
  }
  dragOverHandler(dayNum) {
    const { handleDragOver, rowNumber } = this.props;
    handleDragOver(dayNum, rowNumber);
  }

  render() {
    const { rowNumber, dayItems } = this.props;
    let rowHour;
    const isRowHeader = rowNumber % 4 === 0;
    if (isRowHeader) {
      rowHour = (rowNumber === 0) ? 0 : Math.floor(rowNumber / 4);
    }
    return (
      <tr>
        {isRowHeader && (
          <td className="hour" rowSpan="4">
            <span>{`${rowHour}:00`}</span>
          </td>
        )}
        {dayItems.map((day, index) => (
          <QuarterCell
            key={index} dayNum={index} rowNum={rowNumber} bgColor={day}
            dragStartHandler={this.dragStartHandler} dragOverHandler={this.dragOverHandler}
          />
        ))}
      </tr>
    );
  }
}

export default TimeRow;
