/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation circle shape
 */

'use strict';

//External
let React = require('react/addons');
let ClassNames = require('classnames');


let Circle = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    deemphasize: React.PropTypes.bool.isRequired,
  },

  render() {
    let divStyle = {
      height: this.props.height,
      width: this.props.width,
      zIndex: this.props.priority,
    };

    let classes = ClassNames({
      'cd-circle': true,
      'deemphasize': this.props.deemphasize,
    });

    return (
      <div>
        <div style={divStyle} className={classes}></div>
      </div>
    );
  }
});

module.exports = Circle;
