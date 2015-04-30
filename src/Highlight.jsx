/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation highlight shape
 */

//External
var React = require('react/addons');


var Highlight = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
  },

  render() {
    var divStyle = {
      width: this.props.width,

    };

    return (
      <div>
        <div style={divStyle} className='cd-highlight'></div>
      </div>
    );
  }
});

module.exports = Highlight;
