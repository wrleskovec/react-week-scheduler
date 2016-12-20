'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuarterCell = require('./QuarterCell');

var _QuarterCell2 = _interopRequireDefault(_QuarterCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes,
    Component = _react2.default.Component;

var TimeRow = function (_Component) {
  _inherits(TimeRow, _Component);

  function TimeRow(props) {
    _classCallCheck(this, TimeRow);

    var _this = _possibleConstructorReturn(this, (TimeRow.__proto__ || Object.getPrototypeOf(TimeRow)).call(this, props));

    _this.dragStartHandler = _this.dragStartHandler.bind(_this);
    _this.dragOverHandler = _this.dragOverHandler.bind(_this);
    return _this;
  }

  _createClass(TimeRow, [{
    key: 'dragStartHandler',
    value: function dragStartHandler(dayNum) {
      var _props = this.props,
          handleDragStart = _props.handleDragStart,
          rowNumber = _props.rowNumber;

      handleDragStart(dayNum, rowNumber);
    }
  }, {
    key: 'dragOverHandler',
    value: function dragOverHandler(dayNum) {
      var _props2 = this.props,
          handleDragOver = _props2.handleDragOver,
          rowNumber = _props2.rowNumber;

      handleDragOver(dayNum, rowNumber);
    }
  }, {
    key: 'stripeShade',
    value: function stripeShade(rowNum, color) {
      if (rowNum % 2 === 0) {
        return {
          backgroundColor: 'hsl(' + color[0] + ', ' + color[1] + '%, ' + color[2] + '%)'
        };
      }
      return {
        backgroundColor: 'hsl(' + color[0] + ', ' + color[1] + '%, ' + (color[2] - 5) + '%)'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          rowNumber = _props3.rowNumber,
          dayItems = _props3.dayItems;

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
            bgColor: _this2.stripeShade(rowNumber, day.color),
            dragStartHandler: _this2.dragStartHandler, dragOverHandler: _this2.dragOverHandler
          });
        })
      );
    }
  }]);

  return TimeRow;
}(Component);

TimeRow.propTypes = {
  rowNumber: PropTypes.number,
  dayItems: PropTypes.arrayOf(PropTypes.shape({
    event: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.number)
  })),
  handleDragStart: PropTypes.func,
  handleDragOver: PropTypes.func
};
exports.default = TimeRow;