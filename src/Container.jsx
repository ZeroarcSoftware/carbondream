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
var DEFAULT_MOUSE_OFFSET = {x: -6, y: -18};     // Make the marker land at the tip of the pointer. Not sure how this varies between browsers/OSes
var DEFAULT_SCALE_FACTOR = 1;                   // Default scale factor

var Container = React.createClass({
  propTypes: {
    mouseOffset: React.PropTypes.object
  },

  getInitialState() {
    return {
      scale: DEFAULT_SCALE_FACTOR,
      annotations: Immutable.List(),
      pendingAnnotation: null,
      lastAnnotationId: 0
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
  },

  handleAnnotationCancel(id) {
    this.setState({
      pendingAnnotation: null,
      lastAnnotationId: this.state.lastAnnotationId -= 1
    });
  },

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
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
          x={m.x * this.state.scale}
          y={m.y * this.state.scale} />
      );
    });

    return (
      <div>
        {annotations}
        {pAnnotationComponent}
      </div>
    );
  }
});

module.exports  = Container;
