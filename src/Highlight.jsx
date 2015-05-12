/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation highlight shape
 */

'use strict';

//External
let React = require('react/addons');
let ClassNames = require('classnames');


let Highlight = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    deemphasize: React.PropTypes.bool.isRequired,
  },

  render() {
    let divStyle = {
      width: this.props.width,
      zIndex: this.props.priority,
    };

    let classes = ClassNames({
      'cd-highlight': true,
      'deemphasize': this.props.deemphasize,
    });

    return (
      <div>
        <div style={divStyle} className={classes}></div>
      </div>
    );
  }
});

module.exports = Highlight;
