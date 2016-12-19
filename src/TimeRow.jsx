import React from 'react';
import QuarterCell from './QuarterCell';

const { PropTypes, Component } = React;

class TimeRow extends Component {

  static propTypes = {
    rowNumber: PropTypes.number,
    dayItems: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.string,
      color: PropTypes.arrayOf(PropTypes.number)
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
            key={index} dayNum={index} rowNum={rowNumber}
            bgColor={this.stripeShade(rowNumber, day.color)}
            dragStartHandler={this.dragStartHandler} dragOverHandler={this.dragOverHandler}
          />
        ))}
      </tr>
    );
  }
}

export default TimeRow;
