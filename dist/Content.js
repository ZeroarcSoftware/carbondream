// carbondream - Copyright 2021 Zeroarc Software, LLC
// Pop-up annotation Content
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Content = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactTimeago = _interopRequireDefault(require("react-timeago"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Content = function Content(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      shouldDisplayControls = _useState2[0],
      setShouldDisplayControls = _useState2[1];

  var handleEditClick = function handleEditClick(e) {
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    props.editAnnotation(props.id);
  };

  var handleDeleteClick = function handleDeleteClick(e) {
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    props.deleteAnnotation(props.id);
  }; // These allow event propogation because parent needs mouse events


  var handleMouseOver = function handleMouseOver(e) {
    if (props.viewOnlyMode) return;
    setShouldDisplayControls(true);
  };

  var handleMouseOut = function handleMouseOut(e) {
    setShouldDisplayControls(false);
  };

  var viewerClasses = (0, _classnames["default"])({
    'cd-annotation-viewer': true,
    'hidden': props.pending || !props.shouldDisplayViewer //Hide if we are NOT pending and we SHOULD NOT display

  });
  var contentClasses = (0, _classnames["default"])({
    'cd-annotation-content': true
  });
  var controlClasses = (0, _classnames["default"])({
    'cd-annotation-content-controls': true,
    'fade-in': shouldDisplayControls
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

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: viewerClasses
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: shadowStyle,
    className: shadowClasses
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: contentClasses,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: controlClasses
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "delete",
    onClick: handleDeleteClick,
    hidden: !props.allowDelete
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fa fa-fw fa-times"
  }), " Delete"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "edit",
    onClick: handleEditClick,
    hidden: !props.allowEdit
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fa fa-fw fa-pencil"
  }), " Edit")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cd-annotation-content-text"
  }, props.content), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cd-annotation-content-info"
  }, "Comment #", props.id, " by ", props.author, " ", /*#__PURE__*/_react["default"].createElement(_reactTimeago["default"], {
    date: props.timeStamp
  }))));
};

exports.Content = Content;
var _default = Content;
exports["default"] = _default;