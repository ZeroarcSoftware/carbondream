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
  },

  render() {
    var {x,y,...other} = this.props;

    var divStyle = {
      left: x,
      top: y,
    };

    return (
      <div style={divStyle} className='cd-annotation'>
        <Marker />
        <Content {...other} />
        <Input {...other} />
      </div>
    );
  }
});

module.exports = Annotation;
