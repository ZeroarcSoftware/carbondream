/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Entry point into component
 */
'use strict';

var React = require('react/addons');

// Local
var Container = require('./Container');

console.log('Weaving a new carbon dream.');

module.exports = Container;

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Container />
    , document.getElementById('content')
  );
});

