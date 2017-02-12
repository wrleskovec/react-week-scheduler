import React from 'react';

const QuarterCell = ({ dayNum, rowNum, bgColor }) => (
  <td
    className="quarter-cell" data-day={dayNum} data-row={rowNum} style={bgColor}
  />
  );

export default QuarterCell;
