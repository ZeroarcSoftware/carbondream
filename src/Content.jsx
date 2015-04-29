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
      <div>
        <div className='cd-shadow-bubble'>
        </div>
        <div className={classNames}>
          <div className='cd-annotation-content-text'>
            {this.props.content}
          </div>
          <div className='cd-annotation-content-info'>
            Comment #1 by Justin 7 days ago
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Content;
