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
    deleteAnnotation: React.PropTypes.func.isRequired,

    //Optional
    timeStamp: React.PropTypes.number,
    shouldDisplayViewer: React.PropTypes.bool,
    displayAnnotationViewer: React.PropTypes.func,
    hideAnnotationViewer: React.PropTypes.func,
  },

  handleMouseOver(e) {
    e.stopPropagation();
    if (this.props.pending) return;
    this.props.displayAnnotationViewer(this.props.id);
  },

  handleMouseOut(e) {
    e.stopPropagation();
    if (this.props.pending) return;
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

    var contentComponent = !this.props.pending ? <Content {...other} /> : '';
    var inputComponent = this.props.pending ? <Input {...other} /> : '';

    return (
      <div style={divStyle} className='cd-annotation' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <Marker id={this.props.id} />
        {contentComponent}
        {inputComponent}
      </div>
    );
  }
});

module.exports = Annotation;
