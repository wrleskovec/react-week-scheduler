import React from 'react';
import Color from 'color';
import QuarterCell from './QuarterCell';

function stripeShade(rowNum, color) {
  if (rowNum % 2 === 0) {
    return {
      backgroundColor: color
    };
  }
  return {
    backgroundColor: Color(color).lighten(0.09)
  };
}
const TimeRow = ({ rowNumber, dayItems }) => {
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
          bgColor={stripeShade(rowNumber, day)}
        />
      ))}
    </tr>
  );
};

export default TimeRow;
