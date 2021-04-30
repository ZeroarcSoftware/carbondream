// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation marker shape
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Marker = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Marker = function Marker(props) {
  var divStyle = {
    zIndex: props.priority
  };
  var classes = (0, _classnames["default"])({
    'cd-marker': true,
    'deemphasize': props.deemphasize
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: classes
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'map-marker']
  }));
};

exports.Marker = Marker;
var _default = Marker;
exports["default"] = _default;