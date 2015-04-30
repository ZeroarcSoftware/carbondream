/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation circle shape
 */
'use strict';

//External
var React = require('react/addons');


var Square = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  render() {
    var divStyle = {
      height: this.props.height,
      width: this.props.width,
    };

    return (
      <div>
        <div style={divStyle} className='cd-circle'></div>
        <div style={divStyle} className='cd-circle after'></div>
      </div>
    );
  }
});

module.exports = Square;
