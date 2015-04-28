/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Single annotation marker
 */

//External
var React = require('react/addons');


var Marker = React.createClass({
  propTypes: {
  },

  render() {
    var divStyle = {
      position: 'relative',
    };
    return (
      <div style={divStyle}><i className='fa fa-map-marker'></i></div>
    );
  }
});

module.exports = Marker;
