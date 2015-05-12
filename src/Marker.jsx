/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation marker shape
 */

'use strict';

//External
let React = require('react/addons');
let ClassNames = require('classnames');


let Marker = React.createClass({
  propTypes: {
    deemphasize: React.PropTypes.bool.isRequired,
  },

  render() {
    let divStyle = {
      zIndex: this.props.priority,
    };

    let classes = ClassNames({
      'cd-marker': true,
      'deemphasize': this.props.deemphasize,
    });

    return (
      <div style={divStyle} className={classes}>
        <i className='fa fa-map-marker'></i>
      </div>
    );
  }
});

module.exports = Marker;
