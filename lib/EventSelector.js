"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EventSelector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventSelector(_ref) {
  var events = _ref.events,
      selectedEvent = _ref.selectedEvent,
      selectEvent = _ref.selectEvent;

  var onRadioClick = function onRadioClick(eventSelected) {
    return function (e) {
      selectEvent(eventSelected);
    };
  };
  return _react2.default.createElement(
    "fieldset",
    { id: "EventSelector" },
    _react2.default.createElement(
      "legend",
      null,
      "Events: "
    ),
    _react2.default.createElement(
      "div",
      { className: "legend-body" },
      events.map(function (event) {
        var backgroundColor = "hsl(" + event.color[0] + ", " + event.color[1] + "%, " + event.color[2] + "%)";
        return _react2.default.createElement(
          "div",
          { className: "radio-item" },
          _react2.default.createElement("input", {
            type: "radio", name: "eventSelect", value: event.event,
            checked: selectedEvent.event === event.event,
            onClick: onRadioClick(event)
          }),
          _react2.default.createElement(
            "label",
            { className: "radio-label", htmlFor: event.event },
            event.event
          ),
          _react2.default.createElement("div", { className: "legend-color", style: { backgroundColor: backgroundColor } })
        );
      })
    )
  );
}