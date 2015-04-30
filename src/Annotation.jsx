/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation component
 */

// External
var React = require('react/addons');

// Local
var Marker = require('./Marker');
var Square = require('./Square');
var Circle = require('./Circle');
var Highlight = require('./Highlight');
var Content = require('./Content');
var Input = require('./Input');

var Annotation = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    pending: React.PropTypes.bool.isRequired,
    drawing: React.PropTypes.bool.isRequired,
    deleteAnnotation: React.PropTypes.func.isRequired,
    shouldDisplayViewer: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,

    //Optional
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
    timeStamp: React.PropTypes.number,
    displayAnnotationViewer: React.PropTypes.func,
    hideAnnotationViewer: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      drawing: false,
      shouldDisplayViewer: false
    };
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
      x1,
      y1,
      x2,
      y2,
      displayAnnotationViewer,
      hideAnnotationViewer,
      ...other} = this.props;

    var width = x2 ? Math.abs(x1 - x2) : 0;
    var height = y2 ? Math.abs(y1 - y2) : 0;

    var divStyle = {
      left: x1,
      top: y1,
    };

    if (this.props.shouldDisplayViewer || this.props.pending) {
      divStyle.minHeight = height + 'px';
      divStyle.minWidth = width + 280 + 'px';
    }

    var indicator = '';
    var verticalOffset = null;


    switch(this.props.type) {
      case 'marker':
        indicator = <Marker id={this.props.id} />;
      break;
      case 'square':
        verticalOffset = height;
      indicator = <Square id={this.props.id} width={width} height={height} />;
      break;
      case 'circle':
        var diameter = Math.max(width,height);
      verticalOffset = diameter;

      if (this.props.shouldDisplayViewer || this.props.pending) {
        divStyle.minHeight = diameter + 'px';
        divStyle.minWidth = diameter + 280 + 'px';
      }

      indicator = <Circle id={this.props.id} width={diameter} height={diameter} />;
      break;
      case 'highlight':
        indicator = <Highlight id={this.props.id} width={width} />;
      break;
    }

    var contentComponent = !this.props.drawing && !this.props.pending ? <Content verticalOffset={verticalOffset} {...other} /> : '';
    var inputComponent = !this.props.drawing && this.props.pending ? <Input verticalOffset={verticalOffset} {...other} /> : '';

    return (
      <div style={divStyle} className={'cd-annotation ' + this.props.type} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        {contentComponent}
        {inputComponent}
        {indicator}
      </div>
    );
  }
});

module.exports = Annotation;
