/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Single annotation marker
 */

//External
var React = require('react/addons');

var Marker = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  },

  render() {
    var divStyle = {
      position: 'absolute',
      left: this.props.x,
      top: this.props.y,
    };
    return (
      <div style={divStyle} className='cd-marker'><i className='fa fa-map-marker'></i></div>
    );
  }
});

module.exports = Marker;
