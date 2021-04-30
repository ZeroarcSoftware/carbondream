// carbondream - Copyright 2021 Zeroarc Software, LLC
// Input dialog for annotation
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Input = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Input = function Input(props) {
  var _useState = (0, _react.useState)(props.content),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var handleChange = function handleChange(e) {
    e.stopPropagation();
    setValue(e.target.value);
  };

  var handleSaveClick = function handleSaveClick(e) {
    e.stopPropagation();
    props.saveAnnotation(value);
  };

  var handleCancelClick = function handleCancelClick(e) {
    e.stopPropagation();
    props.cancelAnnotation();
  };

  var handleBlur = function handleBlur(e) {
    e.stopPropagation(); // If the textarea blurs with no input, the user has clicked or tabbed out. Cancel.

    if (value.length === 0) props.cancelAnnotation();
  };

  var editorClasses = (0, _classnames["default"])({
    'cd-annotation-editor': true,
    'hidden': !props.pending
  });
  var inputClasses = (0, _classnames["default"])({
    'cd-annotation-input': true
  });
  var shadowClasses = (0, _classnames["default"])({
    'cd-shadow-bubble': true,
    'invert': props.invert
  }); // Apply offsets for outer div

  var divStyle = {
    left: props.offset.horizontal,
    top: props.offset.vertical
  }; // Apply offsets for shadow bubble. Trial and error to figure
  // out the maximums

  var shadowStyle = {};

  if (props.pushHorizontal || props.pullHorizontal) {
    shadowStyle.left = props.offset.shadow || -props.offset.horizontal - 4;
    if (shadowStyle.left < 6) shadowStyle.left = 6;else if (shadowStyle.left > 234) shadowStyle.left = 234;
  }

  var saveClasses = (0, _classnames["default"])('btn btn-sm btn-outline-primary', {
    disabled: !value.length
  });
  var cancelClasses = (0, _classnames["default"])('btn btn-sm btn-outline-danger');
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: editorClasses
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: shadowStyle,
    className: shadowClasses
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: inputClasses
  }, /*#__PURE__*/_react["default"].createElement("textarea", {
    autoFocus: true,
    value: value,
    onChange: handleChange,
    onBlur: handleBlur
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cd-annotation-input-controls"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: cancelClasses,
    onClick: handleCancelClick
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'times']
  }), " Cancel"), /*#__PURE__*/_react["default"].createElement("button", {
    className: saveClasses,
    onClick: handleSaveClick
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'check']
  }), " Save"))));
};

exports.Input = Input;
var _default = Input;
exports["default"] = _default;