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
      lastAnnotationId: 0
    };
  },

  handleClick(e) {
    console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);
    var id = this.state.lastAnnotationId + 1;
    var mouseOffset = this.props.mouseOffset || DEFAULT_MOUSE_OFFSET;
    var annotation = {
      Id: id += 1,
      content: '',
      pending: true,
      x: (e.clientX + mouseOffset.x) / this.state.scale,
      y: (e.clientY + mouseOffset.y) / this.state.scale
    };

    var annotations = this.state.annotations.push(annotation);
    this.setState({annotations: annotations, lastAnnotationId: annotation.Id});
  },

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  },

  render() {
    var annotations = this.state.annotations.map((m) => {
      return (
        <Annotation key={m.Id}
          content={m.content}
          pending={m.pending}
          x={m.x * this.state.scale}
          y={m.y * this.state.scale} />
      );
    });

    return (
      <div>
        {annotations}
      </div>
    );
  }
});

module.exports  = Container;
