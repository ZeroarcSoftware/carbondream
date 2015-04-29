/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation component
 */

// External
var React = require('react/addons');

// Local
var Marker = require('./Marker');
var Content = require('./Content');
var Input = require('./Input');

var Annotation = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    pending: React.PropTypes.bool.isRequired,
    shouldDisplayViewer: React.PropTypes.bool.isRequired,
    displayAnnotationViewer: React.PropTypes.func.isRequired,
    hideAnnotationViewer: React.PropTypes.func.isRequired,
  },

  handleMouseOver(e) {
    e.preventDefault();
    this.props.displayAnnotationViewer(this.props.id);
  },

  handleMouseOut(e) {
    e.preventDefault();
    this.props.hideAnnotationViewer(this.props.id);
  },

  render() {
    var {
      x,
      y,
      displayAnnotationViewer,
      hideAnnotationViewer,
      ...other} = this.props;

    var divStyle = {
      left: x,
      top: y,
    };

    return (
      <div style={divStyle} className='cd-annotation' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <Marker id={this.props.id} displayAnnotationViewer={displayAnnotationViewer} hideAnnotationViewer={hideAnnotationViewer}  />
        <Content {...other} />
        <Input {...other} />
      </div>
    );
  }
});

module.exports = Annotation;
