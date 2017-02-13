"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuarterCell = function QuarterCell(_ref) {
  var dayNum = _ref.dayNum,
      rowNum = _ref.rowNum,
      bgColor = _ref.bgColor;
  return _react2.default.createElement("td", {
    className: "quarter-cell", "data-day": dayNum, "data-row": rowNum, style: bgColor
  });
};

exports.default = QuarterCell;