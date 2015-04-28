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

// Globals
var DEFAULT_Content_OFFSET = {x: 10, y: -15};


var Annotation = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    pending: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      isEditing: this.props.pending || false
    };
  },

  render() {
    var divStyle = {
      position: 'absolute',
      left: this.props.x,
      top: this.props.y,
    };

    return (
      <div style={divStyle}>
        <Content visible={!this.state.isEditing} content={this.props.content} />
        <Input visible={this.state.isEditing} content={this.props.content} />
        <Marker />
      </div>
    );
  }
});

module.exports = Annotation;
