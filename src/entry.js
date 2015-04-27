/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Entry point into component
 */

var React = require('react/addons');

var Container = require('./Container.jsx');

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Container />
    , document.getElementById('content')
  );
});


