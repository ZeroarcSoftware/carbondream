/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation marker shape
 */
'use strict';

//External
var React = require('react/addons');


var Marker = React.createClass({
  render() {
    var divStyle = {
      zIndex: this.props.priority,
    };

    return (
      <div style={divStyle} className='cd-marker'>
        <i className='fa fa-map-marker'></i>
      </div>
    );
  }
});

module.exports = Marker;
