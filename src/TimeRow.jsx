import React from 'react';
import QuarterCell from './QuarterCell';

function stripeShade(rowNum, color) {
  if (rowNum % 2 === 0) {
    return {
      backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
    };
  }
  return {
    backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2] - 5}%)`
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
          bgColor={stripeShade(rowNumber, day.color)}
        />
      ))}
    </tr>
  );
};

export default TimeRow;
