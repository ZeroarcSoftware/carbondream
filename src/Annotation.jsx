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
    pending: React.PropTypes.bool.isRequired,
  },

  render() {
    var {x,y,...other} = this.props;

    var divStyle = {
      position: 'absolute',
      left: x,
      top: y,
    };

    return (
      <div style={divStyle}>
        <Content {...other} />
        <Input {...other} />
        <Marker />
      </div>
    );
  }
});

module.exports = Annotation;
