// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation square shape
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Square = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Square = function Square(props) {
  var divStyle = {
    height: props.height,
    width: props.width,
    zIndex: props.priority
  };
  var classes = (0, _classnames["default"])({
    'cd-square': true,
    'deemphasize': props.deemphasize
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: classes
  }));
};

exports.Square = Square;
var _default = Square;
exports["default"] = _default;