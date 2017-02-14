'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

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

    var _this$props = _this.props,
        defaultEvent = _this$props.defaultEvent,
        selectedEvent = _this$props.selectedEvent,
        currentSchedule = _this$props.currentSchedule;

    var days = [];
    if (currentSchedule) {
      days = currentSchedule;
    } else {
      for (var i = 0; i < 7; i += 1) {
        var day = [];
        for (var j = 0; j < 96; j += 1) {
          day.push(defaultEvent);
        }
        days.push(day);
      }
    }
    _this.state = {
      days: days,
      startingCell: null,
      currentEvent: selectedEvent || defaultEvent,
      oldDays: days
    };
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onMouseOver = _this.onMouseOver.bind(_this);
    _this.handleSelectEvent = (0, _debounce2.default)(_this.handleSelectEvent.bind(_this), 20);
    return _this;
  }

  _createClass(WeeklyScheduler, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var currentSchedule = this.props.currentSchedule;
      var days = this.state.days;

      this.setState({
        days: newProps.currentSchedule || days
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      e.preventDefault();
      var rowNum = e.target.getAttribute('data-row');
      var dayNum = e.target.getAttribute('data-day');
      this.setState({
        startingCell: {
          day: parseInt(dayNum, 10),
          time: parseInt(rowNum, 10)
        }
      });
      this.weekTable.addEventListener('mouseover', this.onMouseOver);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      var days = this.state.days;

      this.weekTable.removeEventListener('mouseover', this.onMouseOver);
      window.removeEventListener('mouseup', this.onMouseUp);
      this.setState({ oldDays: days });
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver(e) {
      var rowNum = e.target.getAttribute('data-row');
      var dayNum = e.target.getAttribute('data-day');
      this.handleDragOver(parseInt(dayNum, 10), parseInt(rowNum, 10));
    }
  }, {
    key: 'setupTimeRows',
    value: function setupTimeRows() {
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
          key: index, rowNumber: index, dayItems: tRow
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
    key: 'handleDragOver',
    value: function handleDragOver(dayNum, rowNum) {
      var _state = this.state,
          startingCell = _state.startingCell,
          currentEvent = _state.currentEvent,
          oldDays = _state.oldDays;


      var dayDiff = dayNum - startingCell.day;
      var timeDiff = rowNum - startingCell.time;
      var newDays = [];

      for (var j = 0; j < 7; j += 1) {
        newDays.push(oldDays[j].slice());
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
      this.setState({ days: newDays });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          events = _props.events,
          defaultEvent = _props.defaultEvent;
      var currentEvent = this.state.currentEvent;

      return _react2.default.createElement(
        'div',
        { id: 'WeeklySchedulerTable' },
        _react2.default.createElement(_EventSelector2.default, {
          events: events, selectedEvent: currentEvent, selectEvent: this.handleSelectEvent
        }),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(_DayHeader2.default, null),
          _react2.default.createElement(
            'tbody',
            {
              className: 'week-table', onMouseDown: this.onMouseDown,
              ref: function ref(tbody) {
                _this2.weekTable = tbody;
              }
            },
            this.setupTimeRows()
          )
        )
      );
    }
  }]);

  return WeeklyScheduler;
}(_react2.default.Component);

exports.default = WeeklyScheduler;