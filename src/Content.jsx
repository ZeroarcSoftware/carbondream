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
    pending: React.PropTypes.bool.isRequired,
  },

  render() {
    var classNames = ClassNames({
      'cd-annotation-content': true,
      'hidden': this.props.pending
    });

    // Inner shadow-helper class is used to help z-index the text over the shadow/comment bubble
    return (
      <div className={classNames}>
        <div className='shadow-helper'>
          {this.props.content}
        </div>
      </div>
    );
  }
});

module.exports = Content;
