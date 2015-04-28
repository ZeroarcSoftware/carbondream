/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Input dialog for annotation
 */

// External
var React = require('react/addons');
var ClassNames = require('classnames');


var Input = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
  },

  render() {
    var classNames = ClassNames({
      'cd-annotation-input': true,
      'hidden': !this.props.visible
    });

    return (
      <div className={classNames}>
        <input text={this.props.content} />
      </div>
    );
  }
});

module.exports = Input;
