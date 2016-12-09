import React from 'react';

const QuarterCell = ({ dayNum, dragStartHandler, dragOverHandler, rowNum, bgColor }) => {
  const onStartDrag = num => (e) => {
    const dragItem = e.currentTarget.cloneNode();
    dragItem.style.display = 'none';
    e.dataTransfer.setDragImage(dragItem, 0, 0);
    // e.dataTransfer.setData('text/plain', JSON.stringify({
    //   dayNum,
    //   rowNum
    // }));
    dragStartHandler(num);
  };
  const onDragOver = num => (e) => {
    dragOverHandler(num);
  };
  return (
    <td
      className="quarter-cell" draggable="true" onDragStart={onStartDrag(dayNum)} onDragOver={onDragOver(dayNum)}
      style={bgColor}
    />
  );
};

export default QuarterCell;
