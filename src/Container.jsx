/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Top level container component
 */

// External
var React = require('react/addons');
var Immutable = require('immutable');

// Local
var Annotation = require('./Annotation');
var ModeToggle = require('./ModeToggle');

// Globals
var DEFAULT_MOUSE_OFFSET = {x: -8, y: -30};     // Make the marker land at the tip of the pointer. Not sure how this varies between browsers/OSes
var DEFAULT_SCALE_FACTOR = 1;                   // Default scale factor

var Container = React.createClass({
  propTypes: {
    mouseOffset: React.PropTypes.object
  },

  getInitialState() {
    var stateJSON = localStorage['annotationState'] || '{}';
    var state = JSON.parse(stateJSON);
    var annotations = state.annotations || [];

    return {
      scale: DEFAULT_SCALE_FACTOR,
      annotations: Immutable.List(annotations),
      pendingAnnotation: null,
      lastAnnotationId: state.lastAnnotationId || 0,
      visibleViewerId: null,
      mode: state.mode || 'marker',
    };
  },

  handleClick(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation
      || this.state.visibleViewerId
      || this.state.mode !== 'marker') return;

    console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    var id = this.state.lastAnnotationId + 1;
    var mouseOffset = this.props.mouseOffset || DEFAULT_MOUSE_OFFSET;
    var annotation = {
      Id: id += 1,
      content: '',
      timeStamp: Date.now(),
      type: this.state.mode,
      x1: (e.clientX + mouseOffset.x) / this.state.scale,
      y1: (e.clientY + mouseOffset.y) / this.state.scale
    };

    this.setState({
      pendingAnnotation: annotation,
      lastAnnotationId: annotation.Id
    });
  },

  handleMouseDown(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation
      || this.state.visibleViewerId
      || this.state.mode === 'marker') return;

    console.log('mousedown fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    var id = this.state.lastAnnotationId + 1;
    var mouseOffset = this.props.mouseOffset || {x: 0, y: 0};
    var annotation = {
      Id: id += 1,
      content: '',
      timeStamp: Date.now(),
      type: this.state.mode,
      drawing: true,
      x1: e.clientX / this.state.scale,
      y1: e.clientY / this.state.scale,
      x2: e.clientX / this.state.scale,
      y2: e.clientY / this.state.scale,
    };

    this.setState({
      pendingAnnotation: annotation,
      lastAnnotationId: annotation.Id
    });
  },

  handleMouseMove(e) {
     e.stopPropagation();

    if (this.state.visibleViewerId
      || this.state.mode === 'marker'
      || !this.state.pendingAnnotation) return;

    if (!this.state.pendingAnnotation.drawing) return;

    console.log('mousemove fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    var annotation = this.state.pendingAnnotation;
    annotation.x2 = e.clientX / this.state.scale;
    annotation.y2 = e.clientY / this.state.scale;

    this.setState({pendingAnnotation: annotation});
  },

  handleMouseUp(e) {
    e.stopPropagation();

    if (this.state.visibleViewerId
      || this.state.mode === 'marker'
      || !this.state.pendingAnnotation) return;

    console.log('mouseup fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    var annotation = this.state.pendingAnnotation;
    annotation.drawing = false;
    annotation.x2 = e.clientX / this.state.scale;
    annotation.y2 = e.clientY / this.state.scale;

    this.setState({pendingAnnotation: annotation});
  },

  switchMode(mode) {
    console.log('mode is now: ' + mode);
    this.setState({mode: mode});

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.state.annotations,
      lastAnnotationId: this.state.lastAnnotationId,
      mode: mode
    });
  },

  saveAnnotation(id, content) {
    console.log('save ' + id);
    var a = this.state.pendingAnnotation;
    a.content = content;
    a.timeStamp = Date.now();

    var annotations = this.state.annotations;

    // Check to see if this exists already
    var index = annotations.findIndex((value) => {
      if (value.Id === id) return true;
      return false;
    });

    if (index > 0) {
      annotations = annotations.set(index, a);
    }
    else {
      annotations = this.state.annotations.push(a);
    }

    this.setState({
      pendingAnnotation: null,
      annotations: annotations
    });

    localStorage['annotationState'] = JSON.stringify({
      annotations: annotations,
      lastAnnotationId: Math.ceil(a.Id, this.state.lastAnnotationId)  // Only change the Id if its higher, in case we are editing
    });
  },

  // If editing, pull the annotation out and put it in pending, force viewer to null
  editAnnotation(id) {
    console.log('delete ' + id);
    var annotation = this.state.annotations.find((value) => {
      if (value.Id === id) return true;
      return false;
    });

    this.setState({
      pendingAnnotation: annotation,
      visibleViewerId: null
    });
  },

  deleteAnnotation(id) {
    console.log('delete ' + id);
    var index = this.state.annotations.findIndex((value) => {
      if (value.Id === id) return true;
      return false;
    });

    var annotations = this.state.annotations.delete(index);
    this.setState({annotations: annotations});
    localStorage['annotationState'] = JSON.stringify({annotations: annotations});
  },

  cancelAnnotation(id) {
    console.log('cancel ' + id);
    this.setState({
      pendingAnnotation: null,
      lastAnnotationId: this.state.lastAnnotationId -= 1
    });
  },

  displayAnnotationViewer(id) {
    clearTimeout(this.viewerHideTimer);

    this.setState({visibleViewerId: id});
  },

  hideAnnotationViewer(id) {
    clearTimeout(this.viewerHideTimer);

    this.viewerHideTimer = setTimeout(() => {
      this.setState({visibleViewerId: null});
    }, 1000);
  },

  render() {
    var pA = this.state.pendingAnnotation;

    var pAnnotationComponent = '';
    if (this.state.pendingAnnotation) {
      pAnnotationComponent = <Annotation id={pA.Id}
        content={pA.content}
        pending={true}
        drawing={pA.drawing}
        saveAnnotation={this.saveAnnotation}
        cancelAnnotation={this.cancelAnnotation}
        deleteAnnotation={this.deleteAnnotation}
        type={pA.type}
        x1={pA.x1 * this.state.scale}
        y1={pA.y1 * this.state.scale}
        x2={pA.x2 * this.state.scale}
        y2={pA.y2 * this.state.scale} />;
    }

    var annotations = this.state.annotations.map((m) => {
      return (
        <Annotation key={m.Id}
          id={m.Id}
          content={m.content}
          timeStamp={m.timeStamp}
          pending={false}
          shouldDisplayViewer={m.Id === this.state.visibleViewerId}
          displayAnnotationViewer={this.displayAnnotationViewer}
          hideAnnotationViewer={this.hideAnnotationViewer}
          deleteAnnotation={this.deleteAnnotation}
          editAnnotation={this.editAnnotation}
          type={m.type}
          x1={m.x1 * this.state.scale}
          y1={m.y1 * this.state.scale}
          x2={m.x2 * this.state.scale}
          y2={m.y2 * this.state.scale} />
      );
    });

    return (
      <div className='cd-container' onClick={this.handleClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
        <ModeToggle mode={this.state.mode} switchMode={this.switchMode} />
        {annotations}
        {pAnnotationComponent}
      </div>
    );
  }
});

module.exports  = Container;
