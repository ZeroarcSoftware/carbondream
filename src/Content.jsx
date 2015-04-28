/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Pop-up annotation Content
 */

// External
var React = require('react/addons');
var ClassNames = require('classnames');

// Local
var Input = require('./Input');


var Content = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
  },

  render() {
    var divStyle = {
      position: 'relative',
    };

    var classNames = ClassNames({
      'cd-annotation-input': true,
      'hidden': !this.props.visible
    });

    return (
      <div style={divStyle} className={classNames}>
        {this.props.content}
      </div>
    );
  }
});

module.exports = Content;
