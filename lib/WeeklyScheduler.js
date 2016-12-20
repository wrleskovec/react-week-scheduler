'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _DayHeader = require('./DayHeader');

var _DayHeader2 = _interopRequireDefault(_DayHeader);

var _TimeRow = require('./TimeRow');

var _TimeRow2 = _interopRequireDefault(_TimeRow);

var _EventSelector = require('./EventSelector');

var _EventSelector2 = _interopRequireDefault(_EventSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeeklyScheduler = function (_React$Component) {
  _inherits(WeeklyScheduler, _React$Component);

  function WeeklyScheduler(props) {
    _classCallCheck(this, WeeklyScheduler);

    var _this = _possibleConstructorReturn(this, (WeeklyScheduler.__proto__ || Object.getPrototypeOf(WeeklyScheduler)).call(this, props));

    var days = [];
    var _this$props = _this.props,
        defaultEvent = _this$props.defaultEvent,
        selectedEvent = _this$props.selectedEvent;

    for (var i = 0; i < 7; i += 1) {
      var day = [];
      for (var j = 0; j < 96; j += 1) {
        day.push({ color: defaultEvent.color, event: defaultEvent.event });
      }
      days.push(day);
    }
    _this.state = {
      days: days,
      startingCell: null,
      currentEvent: selectedEvent || defaultEvent
    };
    _this.handleDragStart = _this.handleDragStart.bind(_this);
    _this.handleDragOver = _this.handleDragOver.bind(_this);
    _this.handleSelectEvent = _this.handleSelectEvent.bind(_this);
    return _this;
  }

  // onMouseDown(e) {
  //   e.preventDefault();
  // }

  _createClass(WeeklyScheduler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleDragOver = _lodash2.default.debounce(this.handleDragOver, 20);
    }
  }, {
    key: 'setupTimeRows',
    value: function setupTimeRows() {
      var _this2 = this;

      var days = this.state.days;

      var rows = [];
      for (var i = 0; i < 96; i += 1) {
        var row = [];
        for (var j = 0; j < 7; j += 1) {
          row.push(days[j][i]);
        }
        rows.push(row);
      }
      return rows.map(function (tRow, index) {
        return _react2.default.createElement(_TimeRow2.default, {
          key: index, rowNumber: index, dayItems: tRow, handleDragStart: _this2.handleDragStart,
          handleDragOver: _this2.handleDragOver
        });
      });
    }
  }, {
    key: 'handleSelectEvent',
    value: function handleSelectEvent(eventSelected) {
      var currentEvent = this.state.currentEvent;

      if (eventSelected.event !== currentEvent.event) {
        this.setState({ currentEvent: eventSelected });
      }
    }
  }, {
    key: 'handleDragStart',
    value: function handleDragStart(dayNum, rowNum) {
      // const hour = (rowNum === 0) ? 0 : Math.floor(rowNum / 4);
      // const minutes = (rowNum % 4) * 15;
      this.setState({ startingCell: {
          day: dayNum,
          time: rowNum
        } });
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver(dayNum, rowNum) {
      var _state = this.state,
          startingCell = _state.startingCell,
          days = _state.days,
          currentEvent = _state.currentEvent;


      var dayDiff = dayNum - startingCell.day;
      var timeDiff = rowNum - startingCell.time;
      var newDays = [];

      for (var j = 0; j < 7; j += 1) {
        newDays.push(days[j].slice());
      }
      if (dayDiff !== 0) {
        var dayStart = startingCell.day < dayNum ? startingCell.day : dayNum;
        var dayEnd = startingCell.day < dayNum ? dayNum : startingCell.day;
        var timeStart = startingCell.time < rowNum ? startingCell.time : rowNum;
        var timeEnd = startingCell.time < rowNum ? rowNum : startingCell.time;
        for (var _j = dayStart; _j <= dayEnd; _j += 1) {
          if (timeDiff !== 0) {
            for (var i = timeStart; i <= timeEnd; i += 1) {
              newDays[_j][i] = currentEvent;
            }
          } else {
            newDays[_j][startingCell.time] = currentEvent;
          }
        }
      } else if (timeDiff !== 0) {
        var _timeStart = startingCell.time < rowNum ? startingCell.time : rowNum;
        var _timeEnd = startingCell.time < rowNum ? rowNum : startingCell.time;
        for (var _j2 = _timeStart; _j2 <= _timeEnd; _j2 += 1) {
          newDays[startingCell.day][_j2] = currentEvent;
        }
      }
      console.log(newDays);
      this.setState({ days: newDays });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          events = _props.events,
          defaultEvent = _props.defaultEvent;
      var currentEvent = this.state.currentEvent;

      console.log(this.state.days[0]);
      return _react2.default.createElement(
        'div',
        { id: 'WeeklySchedulerTable' },
        _react2.default.createElement(_EventSelector2.default, {
          events: events, selectedEvent: currentEvent, selectEvent: this.handleSelectEvent
        }),
        _react2.default.createElement(
          'table',
          { onMouseDown: this.onMouseDown },
          _react2.default.createElement(_DayHeader2.default, null),
          _react2.default.createElement(
            'tbody',
            null,
            this.setupTimeRows()
          )
        )
      );
    }
  }]);

  return WeeklyScheduler;
}(_react2.default.Component);

exports.default = WeeklyScheduler;