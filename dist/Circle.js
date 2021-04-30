// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation circle shape
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Circle = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Circle = function Circle(props) {
  var divStyle = {
    height: props.height,
    width: props.width,
    zIndex: props.priority
  };
  var classes = (0, _classnames["default"])({
    'cd-circle': true,
    'deemphasize': props.deemphasize
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: classes
  }));
};

exports.Circle = Circle;
var _default = Circle;
exports["default"] = _default;