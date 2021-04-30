// carbondream - Copyright 2021 Zeroarc Software, LLC
// Controls to toggle annotation modes
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ModeToggle = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// This is neccessary to prevent mouseup/down from triggering actions on parents
var blockEvent = function blockEvent(e) {
  e.stopPropagation();
};

var ModeToggle = function ModeToggle(_ref) {
  var mode = _ref.mode,
      switchMode = _ref.switchMode;

  var handleClick = function handleClick(mode) {
    return function (e) {
      e.stopPropagation();
      switchMode(mode);
    };
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "cd-mode-toggle",
    onMouseUp: blockEvent,
    onMouseDown: blockEvent,
    onClick: blockEvent
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: mode === 'marker' ? 'selected' : '',
    onClick: handleClick('marker'),
    title: "Switch to marker"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'map-marker']
  })), /*#__PURE__*/_react["default"].createElement("button", {
    className: mode === 'square' ? 'selected' : '',
    onClick: handleClick('square'),
    title: "Switch to square"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'square']
  })), /*#__PURE__*/_react["default"].createElement("button", {
    className: mode === 'circle' ? 'selected' : '',
    onClick: handleClick('circle'),
    title: "Switch to circle"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'circle']
  })), /*#__PURE__*/_react["default"].createElement("button", {
    className: mode === 'highlight' ? 'selected' : '',
    onClick: handleClick('highlight'),
    title: "Switch to highlight"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'font']
  })));
};

exports.ModeToggle = ModeToggle;
var _default = ModeToggle;
exports["default"] = _default;