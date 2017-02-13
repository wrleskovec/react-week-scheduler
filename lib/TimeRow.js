'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _QuarterCell = require('./QuarterCell');

var _QuarterCell2 = _interopRequireDefault(_QuarterCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripeShade(rowNum, color) {
  if (rowNum % 2 === 0) {
    return {
      backgroundColor: color
    };
  }
  return {
    backgroundColor: (0, _color2.default)(color).lighten(0.09)
  };
}
var TimeRow = function TimeRow(_ref) {
  var rowNumber = _ref.rowNumber,
      dayItems = _ref.dayItems;

  var rowHour = void 0;
  var isRowHeader = rowNumber % 4 === 0;
  if (isRowHeader) {
    rowHour = rowNumber === 0 ? 0 : Math.floor(rowNumber / 4);
  }
  return _react2.default.createElement(
    'tr',
    null,
    isRowHeader && _react2.default.createElement(
      'td',
      { className: 'hour', rowSpan: '4' },
      _react2.default.createElement(
        'span',
        null,
        rowHour + ':00'
      )
    ),
    dayItems.map(function (day, index) {
      return _react2.default.createElement(_QuarterCell2.default, {
        key: index, dayNum: index, rowNum: rowNumber,
        bgColor: stripeShade(rowNumber, day.color)
      });
    })
  );
};

exports.default = TimeRow;