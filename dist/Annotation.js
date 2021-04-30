// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation component
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Annotation = void 0;

var _react = _interopRequireDefault(require("react"));

var _Marker = _interopRequireDefault(require("./Marker"));

var _Square = _interopRequireDefault(require("./Square"));

var _Circle = _interopRequireDefault(require("./Circle"));

var _Highlight = _interopRequireDefault(require("./Highlight"));

var _Content = _interopRequireDefault(require("./Content"));

var _Input = _interopRequireDefault(require("./Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Globals
var BUBBLEDIM = {
  width: 260,
  height: 120
};
var defaultProps = {
  drawing: false,
  shouldDisplayViewer: false
};

var Annotation = function Annotation(props) {
  props = _objectSpread(_objectSpread({}, defaultProps), props);

  var handleMouseOver = function handleMouseOver(e) {
    e.stopPropagation();
    if (props.pending) return;
    if (!props.displayAnnotationViewer) return;
    props.displayAnnotationViewer(props.id);
  };

  var handleMouseOut = function handleMouseOut(e) {
    e.stopPropagation();
    if (props.pending) return;
    if (!props.hideAnnotationViewer) return;
    props.hideAnnotationViewer(props.id);
  };

  var handleClick = function handleClick(e) {
    // Allow markers to be placed inside shapes, but not on other markers
    if (props.type === 'marker') e.stopPropagation();
  }; // Desctructing is on one line b/c vim indenting gets confused


  var _props = props,
      x1 = _props.x1,
      y1 = _props.y1,
      x2 = _props.x2,
      y2 = _props.y2,
      displayAnnotationViewer = _props.displayAnnotationViewer,
      hideAnnotationViewer = _props.hideAnnotationViewer,
      other = _objectWithoutProperties(_props, ["x1", "y1", "x2", "y2", "displayAnnotationViewer", "hideAnnotationViewer"]);

  var width = Math.abs(x1 - x2);
  var height = Math.abs(y1 - y2); // Figure out what direction the mouse is dragging. 1 === left to right, up to down

  var xDir = x2 - x1 >= 0 ? 1 : -1;
  var yDir = y2 - y1 >= 0 ? 1 : -1;
  var divStyle = {
    left: xDir === 1 ? x1 : x2,
    top: yDir === 1 ? y1 : y2
  }; // Default offsets based on height/width of bubble

  var offset = {
    vertical: -BUBBLEDIM.height - 10,
    horizontal: width / 2 - BUBBLEDIM.width / 2,
    shadow: null
  };
  var indicator = null;

  switch (props.type) {
    case 'marker':
      indicator = /*#__PURE__*/_react["default"].createElement(_Marker["default"], {
        deemphasize: props.deemphasize,
        priority: props.priority
      });
      offset.vertical -= 25;
      height = 0;
      offset.horizontal = -BUBBLEDIM.width / 2;
      break;

    case 'square':
      indicator = /*#__PURE__*/_react["default"].createElement(_Square["default"], {
        deemphasize: props.deemphasize,
        width: width,
        height: height,
        priority: props.priority
      });
      break;

    case 'circle':
      // For circles, we need to use the biggest mouse value as diameter
      width = height = Math.max(width, height);
      indicator = /*#__PURE__*/_react["default"].createElement(_Circle["default"], {
        deemphasize: props.deemphasize,
        width: width,
        height: height,
        priority: props.priority
      });
      break;

    case 'highlight':
      divStyle.top = y1; // Force back to y1, highlights must stay on same vertical height

      height = 21; // Force height of highlight to allow correct bubble placement

      indicator = /*#__PURE__*/_react["default"].createElement(_Highlight["default"], {
        deemphasize: props.deemphasize,
        width: width,
        priority: props.priority
      });
      break;
  } // If we are going to push above the viewport, invert the bubble and modify the offset to draw below


  var invert = y1 + offset.vertical - 10 + props.containerOffset.vertical <= 0 ? true : false;
  if (invert) offset.vertical = height + 36; // Check to see if we are going to draw past the left or right side of the viewport.

  if (!document || !document.documentElement) return;
  var viewPortWidth = document.documentElement.clientWidth - props.containerOffset.horizontal;
  var pushHorizontal = x1 + (width / 2 - BUBBLEDIM.width / 2) + props.containerOffset.horizontal <= 0 ? true : false;
  var pullHorizontal = x1 + (width / 2 + BUBBLEDIM.width / 2) >= viewPortWidth ? true : false; // If we need to push or pull the bubble, recalculate the offsets based on bubble size and
  // marker position. This was fun to figure out. The 5 is just there for additional padding.

  if (pushHorizontal) {
    var additionalOffset = offset.horizontal + x1 - 5;
    offset.horizontal = offset.horizontal - additionalOffset;
    if (props.type !== 'marker') offset.shadow = x1 + width / 2 - 14;else offset.shadow = x1 - 14;
  } else if (pullHorizontal) {
    var _additionalOffset = viewPortWidth - (BUBBLEDIM.width + 5) - offset.horizontal - x1;

    offset.horizontal = offset.horizontal + _additionalOffset;
    if (props.type !== 'marker') offset.shadow = -offset.horizontal + width / 2 - 10;else offset.shadow = -offset.horizontal - 10;
  }

  var contentComponent = !props.drawing && !props.pending ? /*#__PURE__*/_react["default"].createElement(_Content["default"], _extends({
    invert: invert,
    pushHorizontal: pushHorizontal,
    pullHorizontal: pullHorizontal,
    offset: offset
  }, other)) : '';
  var inputComponent = !props.drawing && props.pending ? /*#__PURE__*/_react["default"].createElement(_Input["default"], _extends({
    invert: invert,
    pushHorizontal: pushHorizontal,
    pullHorizontal: pullHorizontal,
    offset: offset
  }, other)) : ''; //console.log(`drawing indicator at left: ${divStyle.left}, top: ${divStyle.top}`);

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle,
    className: 'cd-annotation ' + props.type,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onClick: handleClick
  }, contentComponent, inputComponent, indicator);
};

exports.Annotation = Annotation;
Annotation.defaultProps = defaultProps;
var _default = Annotation;
exports["default"] = _default;