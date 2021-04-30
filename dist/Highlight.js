// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation highlight shape
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Highlight = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Highlight = function Highlight(props) {
  var divStyle = {
    width: props.width,
    zIndex: props.priority
  };
  var classes = (0, _classnames["default"])({
    'cd-highlight': true,
    'deemphasize': props.deemphasize
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: classes
  }));
};

exports.Highlight = Highlight;
var _default = Highlight;
exports["default"] = _default;