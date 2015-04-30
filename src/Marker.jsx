/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation marker shape
 */

//External
var React = require('react/addons');


var Marker = React.createClass({
  render() {
    return (
      <div className='cd-marker'>
        <i className='fa fa-map-marker'></i>
      </div>
    );
  }
});

module.exports = Marker;
