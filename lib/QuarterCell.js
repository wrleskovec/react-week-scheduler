'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuarterCell = function QuarterCell(_ref) {
  var dayNum = _ref.dayNum,
      dragStartHandler = _ref.dragStartHandler,
      dragOverHandler = _ref.dragOverHandler,
      rowNum = _ref.rowNum,
      bgColor = _ref.bgColor;

  var onStartDrag = function onStartDrag(num) {
    return function (e) {
      var dragItem = e.currentTarget.cloneNode();
      dragItem.style.display = 'none';
      e.dataTransfer.setDragImage(dragItem, 0, 0);
      // e.dataTransfer.setData('text/plain', JSON.stringify({
      //   dayNum,
      //   rowNum
      // }));
      dragStartHandler(num);
    };
  };
  var onDragOver = function onDragOver(num) {
    return function (e) {
      dragOverHandler(num);
    };
  };
  return _react2.default.createElement('td', {
    className: 'quarter-cell', draggable: 'true', onDragStart: onStartDrag(dayNum), onDragOver: onDragOver(dayNum),
    style: bgColor
  });
};

exports.default = QuarterCell;