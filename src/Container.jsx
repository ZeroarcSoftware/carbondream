/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Top level container component
 */
'use strict';

// External
let React = require('react/addons');
let Immutable = require('immutable');

// Local
let Annotation = require('./Annotation');
let ModeToggle = require('./ModeToggle');

// Globals
let DEFAULT_MOUSE_OFFSET = {x: -8, y: -30};     // Make the marker land at the tip of the pointer. Not sure how this varies between browsers/OSes
let DEFAULT_SCALE_FACTOR = 1;                   // Default scale factor

let Container = React.createClass({
  propTypes: {
    annotations: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    //Optional
    mouseOffset: React.PropTypes.object,
  },

  getInitialState() {
    return {
      scale: DEFAULT_SCALE_FACTOR,
      pendingAnnotation: null,
      visibleViewerId: null,
      mode: 'marker',
    };
  },

  handleClick(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation
      || this.state.visibleViewerId
      || this.state.mode !== 'marker') return;

    console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let mouseOffset = this.props.mouseOffset || DEFAULT_MOUSE_OFFSET;
    let annotation = {
      content: '',
      timeStamp: Date.now(),
      type: this.state.mode,
      x1: (e.clientX + mouseOffset.x) / this.state.scale,
      y1: (e.clientY + mouseOffset.y) / this.state.scale
    };

    this.setState({
      pendingAnnotation: annotation
    });
  },

  handleMouseDown(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation
      || this.state.visibleViewerId
      || this.state.mode === 'marker') return;

    console.log('mousedown fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let mouseOffset = this.props.mouseOffset || {x: 0, y: 0};
    let annotation = {
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
    });
  },

  handleMouseMove(e) {
     e.stopPropagation();

    if (this.state.visibleViewerId
      || this.state.mode === 'marker'
      || !this.state.pendingAnnotation) return;

    // If drawing is not true, then don't proceed
    if (!this.state.pendingAnnotation.drawing) return;

    console.log('mousemove fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = this.state.pendingAnnotation;
    annotation.x2 = e.clientX / this.state.scale;
    annotation.y2 = e.clientY / this.state.scale;

    this.setState({pendingAnnotation: annotation});
  },

  handleMouseUp(e) {
    e.stopPropagation();

    if (this.state.visibleViewerId
      || this.state.mode === 'marker'
      || !this.state.pendingAnnotation) return;

    // If drawing is false, we have already popped the input dialog
    if (!this.state.pendingAnnotation.drawing) return;

    console.log('mouseup fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = this.state.pendingAnnotation;
    annotation.drawing = false;
    annotation.x2 = e.clientX / this.state.scale;
    annotation.y2 = e.clientY / this.state.scale;

    this.setState({pendingAnnotation: annotation});
  },

  switchMode(mode) {
    console.log('mode is now: ' + mode);
    this.setState({mode: mode});

    if (this.state.pendingAnnotation) {
      this.cancelAnnotation();
    }
  },

  saveAnnotation(content) {
    let a = this.state.pendingAnnotation;
    a.content = content;
    a.timeStamp = Date.now();

    this.props.onSave(a);
    this.setState({pendingAnnotation: null});
  },

  deleteAnnotation(id) {
    this.props.onDelete(id);
  },

  // If editing, pull the annotation out and put it in pending, force viewer to null
  editAnnotation(id) {
    let annotation = this.props.annotations.find((value) => {
      if (value.Id === id) return true;
      return false;
    });

    this.setState({
      pendingAnnotation: annotation,
      visibleViewerId: null
    });
  },

  cancelAnnotation() {
    this.setState({
      pendingAnnotation: null,
    });
  },

  displayAnnotationViewer(id) {
    if (this.state.pendingAnnotation) return;

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
    console.log('render');
    let pA = this.state.pendingAnnotation;

    let pAnnotationComponent = '';
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

    let annotations = this.props.annotations.map((m) => {
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
