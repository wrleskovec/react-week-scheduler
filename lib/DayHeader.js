"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DayHeader() {
  return _react2.default.createElement(
    "thead",
    null,
    _react2.default.createElement(
      "tr",
      null,
      _react2.default.createElement("th", null),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Monday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Mon"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Tuesday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Tue"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Wednesday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "We"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Thursday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Thur"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Friday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Fri"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Saturday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Sat"
        )
      ),
      _react2.default.createElement(
        "th",
        null,
        _react2.default.createElement(
          "span",
          { className: "long" },
          "Sunday"
        ),
        _react2.default.createElement(
          "span",
          { className: "short" },
          "Sun"
        )
      )
    )
  );
}

exports.default = DayHeader;