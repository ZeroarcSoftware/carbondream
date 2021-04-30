// carbondream - Copyright 2021 Zeroarc Software, LLC
// Top level container component
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _immutable = _interopRequireDefault(require("immutable"));

var _Annotation = _interopRequireDefault(require("./Annotation"));

var _ModeToggle = _interopRequireDefault(require("./ModeToggle"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  viewOnlyMode: false,
  selectedId: 0,
  scale: 1,
  hidden: false
};

var Container = function Container(props) {
  props = _objectSpread(_objectSpread({}, defaultProps), props); //#region Hooks

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      pendingAnnotation = _useState2[0],
      setPendingAnnotation = _useState2[1];

  var _useState3 = (0, _react.useState)(props.selectedId || 0),
      _useState4 = _slicedToArray(_useState3, 2),
      visibleViewerId = _useState4[0],
      setVisibleViewerId = _useState4[1];

  var _useState5 = (0, _react.useState)('marker'),
      _useState6 = _slicedToArray(_useState5, 2),
      mode = _useState6[0],
      setMode = _useState6[1];

  var _useState7 = (0, _react.useState)({
    vertical: 0,
    horizontal: 0,
    shadow: null
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      containerOffset = _useState8[0],
      setContainerOffset = _useState8[1];

  var viewerHideTimer = (0, _react.useRef)(null);
  var cdContainer = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var component = _reactDom["default"].findDOMNode(_this);

    if (!component) return;
    component.addEventListener("scroll", updateOffset);
    updateOffset();
    return function () {
      return component.removeEventListener("scroll", updateOffset);
    };
  }, []);
  (0, _react.useEffect)(function () {
    setVisibleViewerId(props.selectedId);
  }, [props.selectedId]); //#endregion

  var getOffset = function getOffset(element) {
    var doc = element && element.ownerDocument;

    if (!doc || !element || typeof element.getBoundingClientRect !== 'function') {
      return {
        vertical: 0,
        horizontal: 0,
        shadow: null
      };
    }

    var box = element.getBoundingClientRect();
    return {
      vertical: box.top,
      horizontal: box.left,
      shadow: null
    };
  };

  var updateOffset = function updateOffset() {
    var offset = getOffset(cdContainer.current);
    setContainerOffset(offset);
  };

  var handleClick = function handleClick(e) {
    console.log("click fired. scale: ".concat(props.scale, ", offset(top/left): ").concat(containerOffset.vertical, "/").concat(containerOffset.horizontal, ", clientX: ").concat(e.clientX, ", clientY: ").concat(e.clientY, ", screenX: ").concat(e.screenX, ", screenY: ").concat(e.screenY));
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    updateOffset();
    if (pendingAnnotation || mode !== 'marker') return;

    var annotation = _immutable["default"].Map({
      content: '',
      timeStamp: new Date(),
      type: mode,
      x1: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y1: Math.round((e.clientY - containerOffset.vertical) / props.scale),
      x2: Math.round((e.clientX + 14 - containerOffset.horizontal) / props.scale),
      //14 & 24 are the size of the marker
      y2: Math.round((e.clientY + 24 - containerOffset.vertical) / props.scale)
    }); //console.log(`annotation: scale: ${props.scale}, offset(top/left): ${containerOffset.vertical}/${containerOffset.horizontal}, x1: ${annotation.get('x1')}, y1: ${annotation.get('y1')}, x2: ${annotation.get('x2')}, y2: ${annotation.get('y2')}`);


    setPendingAnnotation(annotation);
  };

  var handleMouseDown = function handleMouseDown(e) {
    //console.log(`mousedown fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    updateOffset();
    if (pendingAnnotation || visibleViewerId || mode === 'marker') return;

    var annotation = _immutable["default"].Map({
      content: '',
      timeStamp: new Date(),
      type: mode,
      drawing: true,
      x1: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y1: Math.round((e.clientY - containerOffset.vertical) / props.scale),
      x2: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y2: Math.round((e.clientY - containerOffset.vertical) / props.scale)
    });

    setPendingAnnotation(annotation);
  };

  var handleMouseMove = function handleMouseMove(e) {
    //console.log(`mousemove fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    updateOffset();
    if (visibleViewerId || mode === 'marker' || !pendingAnnotation) return; // If drawing is not true, then don't proceed

    var annotation = pendingAnnotation;
    if (annotation === null) return;
    if (!annotation.get('drawing')) return;
    annotation = annotation.set('x2', (e.clientX - containerOffset.horizontal) / props.scale).set('y2', (e.clientY - containerOffset.vertical) / props.scale);
    setPendingAnnotation(annotation);
  };

  var handleMouseUp = function handleMouseUp(e) {
    //console.log(`mouseup fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;
    updateOffset();
    if (visibleViewerId || mode === 'marker' || !pendingAnnotation) return; // If drawing is false, we have already popped the input dialog

    var annotation = pendingAnnotation;
    if (annotation === null) return;
    if (!annotation.get('drawing')) return;
    annotation = annotation.set('drawing', false).set('x2', Math.round((e.clientX - containerOffset.horizontal) / props.scale)).set('y2', Math.round((e.clientY - containerOffset.vertical) / props.scale));

    if (annotation.get('x2') < annotation.get('x1')) {
      var newAnnotation = annotation.set('x1', annotation.get('x2')).set('x2', annotation.get('x1'));
      annotation = newAnnotation;
    }

    if (annotation.get('y2') < annotation.get('y1')) {
      var _newAnnotation = annotation.set('y1', annotation.get('y2')).set('y2', annotation.get('y1'));

      annotation = _newAnnotation;
    } // Only save the pending change if the mark is bigger than a single point
    // In this case, vertical or horizontal lines are allowed


    if (Math.abs(annotation.get('x2') - annotation.get('x1')) < 1 && Math.abs(annotation.get('y2') - annotation.get('y1')) < 1) {
      setPendingAnnotation(null);
    } else {
      setPendingAnnotation(annotation);
    }
  };

  var switchMode = function switchMode(mode) {
    //console.log('mode is now: ' + mode);
    setMode(mode);

    if (pendingAnnotation) {
      cancelAnnotation();
    }
  };

  var saveAnnotation = function saveAnnotation(content) {
    if (!pendingAnnotation) return;
    var a = pendingAnnotation.set('content', content).set('timeStamp', new Date());
    props.onSave(a);
    setPendingAnnotation(null);
  };

  var deleteAnnotation = function deleteAnnotation(id) {
    props.onDelete(id);
  }; // If editing, pull the annotation out and put it in pending, force viewer to null


  var editAnnotation = function editAnnotation(id) {
    var annotation = props.annotations.find(function (value) {
      if (value.get('id') === id) return true;
      return false;
    });
    setPendingAnnotation(annotation);
    setVisibleViewerId(0);
  };

  var cancelAnnotation = function cancelAnnotation() {
    // TODO: This delays the close event by 50ms to prevent any other click events from firing
    // Is this gross? I don't even know. Think about it some more and change if it is.
    // Hard to see how to do this without timers or screwing up component isolation
    setTimeout(function () {
      setPendingAnnotation(null);
    }, 50);
  };

  var displayAnnotationViewer = function displayAnnotationViewer(id) {
    if (pendingAnnotation) return;
    clearTimeout(viewerHideTimer.current); // If a onSelect handler has been provided, invoke it

    if (props.onSelect) {
      props.onSelect(id);
    }

    setVisibleViewerId(id);
  };

  var hideAnnotationViewer = function hideAnnotationViewer(id) {
    clearTimeout(viewerHideTimer.current);
    viewerHideTimer.current = setTimeout(function () {
      // If a onDeselect handler has been provided, invoke it
      if (props.onDeselect) {
        props.onDeselect();
      }

      setVisibleViewerId(0);
    }, 250);
  };

  var pA = pendingAnnotation;
  var pAnnotationComponent = null;

  if (pA && !props.hidden) {
    pAnnotationComponent = /*#__PURE__*/_react["default"].createElement(_Annotation["default"], {
      id: pA.get('id'),
      allowDelete: false,
      allowEdit: false,
      content: pA.get('content'),
      pending: true,
      priority: 0,
      drawing: pA.get('drawing'),
      saveAnnotation: saveAnnotation,
      cancelAnnotation: cancelAnnotation,
      deleteAnnotation: deleteAnnotation,
      editAnnotation: editAnnotation,
      deemphasize: false,
      type: pA.get('type'),
      containerOffset: containerOffset,
      author: pA.get('author'),
      viewOnlyMode: false,
      x1: pA.get('x1') * props.scale,
      y1: pA.get('y1') * props.scale,
      x2: pA.get('x2') * props.scale,
      y2: pA.get('y2') * props.scale
    });
  } // Sorting the annotations: largest area to smallest area, then highlights, then markers
  // This allows us to assign a priority with biggest shapes being lowest in order to
  // calculate a z-index that stacks them accordingly


  var sortedAnnotations = props.annotations.sort(function (a1, a2) {
    var m1 = a1.toJS();
    var m2 = a2.toJS();

    if (m1.type === 'marker' || m2.type === 'marker') {
      if (m1.type === m2.type) return 0;
      if (m1.type === 'marker') return 1;
      return -1;
    }

    if (m1.type === 'highlight' || m2.type === 'highlight') {
      if (m1.type === m2.type) return 0;
      if (m1.type === 'highlight') return 1;
      return -1;
    }

    var m1Area = Math.abs((m1.x1 - m1.x2) * (m1.y1 - m1.y2));
    var m2Area = Math.abs((m2.x1 - m2.x2) * (m2.y1 - m2.y2));
    return m2Area - m1Area;
  });
  var annotations = '';

  if (!props.hidden) {
    annotations = sortedAnnotations.map(function (a, i) {
      return /*#__PURE__*/_react["default"].createElement(_Annotation["default"], {
        allowDelete: props.allowDelete,
        allowEdit: props.allowEdit,
        key: a.get('id'),
        id: a.get('id'),
        priority: i + 1,
        content: a.get('content'),
        timeStamp: a.get('timeStamp'),
        pending: false,
        shouldDisplayViewer: a.get('id') === visibleViewerId,
        deemphasize: visibleViewerId !== 0 && a.get('id') !== visibleViewerId,
        displayAnnotationViewer: displayAnnotationViewer,
        hideAnnotationViewer: hideAnnotationViewer,
        deleteAnnotation: deleteAnnotation,
        editAnnotation: editAnnotation,
        saveAnnotation: saveAnnotation,
        cancelAnnotation: cancelAnnotation,
        viewOnlyMode: props.viewOnlyMode,
        type: a.get('type'),
        author: a.get('author'),
        containerOffset: containerOffset,
        x1: a.get('x1') * props.scale,
        y1: a.get('y1') * props.scale,
        x2: a.get('x2') * props.scale,
        y2: a.get('y2') * props.scale
      });
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: cdContainer,
    className: "cd-container",
    style: {
      backgroundColor: 'rgba(0,0,0,0)'
      /*IE 10 click event workaround*/

    },
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove
  }, props.viewOnlyMode || /*#__PURE__*/_react["default"].createElement(_ModeToggle["default"], {
    mode: mode,
    switchMode: switchMode
  }), annotations, pAnnotationComponent);
};

exports.Container = Container;
Container.defaultProps = defaultProps;
var _default = Container;
exports["default"] = _default;