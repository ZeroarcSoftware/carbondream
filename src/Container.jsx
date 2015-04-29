/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Top level container component
 */

// External
var React = require('react/addons');
var Immutable = require('immutable');

// Local
var Annotation = require('./Annotation');

// Globals
var DEFAULT_MOUSE_OFFSET = {x: -6, y: -20};     // Make the marker land at the tip of the pointer. Not sure how this varies between browsers/OSes
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
    };
  },

  handleClick(e) {
    e.preventDefault();
    console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    if (this.state.pendingAnnotation) return;

    var id = this.state.lastAnnotationId + 1;
    var mouseOffset = this.props.mouseOffset || DEFAULT_MOUSE_OFFSET;
    var annotation = {
      Id: id += 1,
      content: '',
      x: (e.clientX + mouseOffset.x) / this.state.scale,
      y: (e.clientY + mouseOffset.y) / this.state.scale
    };

    this.setState({
      pendingAnnotation: annotation,
      lastAnnotationId: annotation.Id
    });

  },

  handleAnnotationSave(id, content) {
    console.log('save ' + id);
    var a = this.state.pendingAnnotation;
    a.content = content;
    var annotations = this.state.annotations.push(a);
    this.setState({
      pendingAnnotation: null,
      annotations: annotations
    });

    localStorage['annotationState'] = JSON.stringify({annotations: annotations, lastAnnotationId: a.Id});
  },

  handleAnnotationCancel(id) {
    console.log('cancel ' + id);
    this.setState({
      pendingAnnotation: null,
      lastAnnotationId: this.state.lastAnnotationId -= 1
    });
  },

  displayAnnotationViewer(id) {
    console.log('display viewer: ' + id);

    console.log('display clearing timer: ' + this.viewerHideTimer);
    clearTimeout(this.viewerHideTimer);

    this.setState({visibleViewerId: id});
  },

  hideAnnotationViewer(id) {
    console.log('hide viewer: ' + id);

    console.log('hide clearing timer: ' + this.viewerHideTimer);
    clearTimeout(this.viewerHideTimer);

    this.viewerHideTimer = setTimeout(() => {
      console.log('hide timer fired for id: ' + id);
      this.setState({visibleViewerId: null});
    }, 1000);
    console.log('timer for id ' + id + ' is: ' + this.viewerHideTimer);
  },

  render() {
    var pA = this.state.pendingAnnotation;

    var pAnnotationComponent = this.state.pendingAnnotation
      ? <Annotation id={pA.Id}
          content={pA.content}
          pending={true}
          handleAnnotationSave={this.handleAnnotationSave}
          handleAnnotationCancel={this.handleAnnotationCancel}
          x={pA.x * this.state.scale}
          y={pA.y * this.state.scale} />
      : '';

    var annotations = this.state.annotations.map((m) => {
      return (
        <Annotation key={m.Id}
          id={m.Id}
          content={m.content}
          pending={false}
          shouldDisplayViewer={m.Id === this.state.visibleViewerId}
          displayAnnotationViewer={this.displayAnnotationViewer}
          hideAnnotationViewer={this.hideAnnotationViewer}
          x={m.x * this.state.scale}
          y={m.y * this.state.scale} />
      );
    });

    return (
      <div className='cd-container' onClick={this.handleClick}>
        {annotations}
        {pAnnotationComponent}
      </div>
    );
  }
});

module.exports  = Container;
