/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation square shape
 */

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
        <div style={divStyle} className='cd-square'></div>
        <div style={divStyle} className='cd-square after'></div>
      </div>
    );
  }
});

module.exports = Square;
