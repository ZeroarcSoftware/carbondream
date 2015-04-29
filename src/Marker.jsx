/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Single annotation marker
 */

//External
var React = require('react/addons');


var Marker = React.createClass({
  handleMouseOver(e) {
    e.preventDefault();
    this.props.displayAnnotationViewer(this.props.id);
  },

  handleMouseOut(e) {
    e.preventDefault();
    this.props.hideAnnotationViewer(this.props.id);
  },

  render() {
    return (
      <div className='cd-marker' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <i className='fa fa-map-marker'></i>
      </div>
    );
  }
});

module.exports = Marker;
