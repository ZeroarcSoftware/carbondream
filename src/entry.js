/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Entry point into component
 */

// External
var React = require('react/addons');

// Local
var Container = require('./Container.jsx');


console.log('Weaving a new carbon dream.');
document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Container />
    , document.getElementById('content')
  );
});


