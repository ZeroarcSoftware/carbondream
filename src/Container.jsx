/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Top level container component
 */

// External
var React = require('react/addons');
var Immutable = require('immutable');

// Local
var Marker = require('./Marker');

// Globals
var DEFAULT_MOUSE_OFFSET = {x: -6, y: -18};     // Make the marker land at the tip of the pointer. Not sure how this varies between browsers/OSes
var DEFAULT_SCALE_FACTOR = 1;                          // Default scale factor

var Container = React.createClass({
  propTypes: {
    mouseOffset: React.PropTypes.object
  },

  getInitialState() {
    return {
      scale: DEFAULT_SCALE_FACTOR,
      markers: Immutable.List(),
      lastMarkerId: 0
    };
  },

  handleClick(e) {
    console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);
    var id = this.state.lastMarkerId + 1;
    var mouseOffset = this.props.mouseOffset || DEFAULT_MOUSE_OFFSET;
    var marker = {
      Id: id += 1,
      x: (e.clientX + mouseOffset.x) / this.state.scale,
      y: (e.clientY + mouseOffset.y) / this.state.scale
    };

    var markers = this.state.markers.push(marker);
    this.setState({markers: markers, lastMarkerId: marker.Id});
  },

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  },

  render() {
    var markers = this.state.markers.map((m) => {
      return (
        <Marker key={m.Id}
          x={m.x * this.state.scale}
          y={m.y * this.state.scale} />
      );
    });


    console.log('Weaving a new carbon dream.');
    return (
      <div>
        {markers}
      </div>
    );
  }
});

module.exports  = Container;
