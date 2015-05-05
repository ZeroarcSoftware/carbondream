/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Demo: Annotation Reflux Actions
 */

'use strict';

//External
var Reflux = require('reflux');


var AnnotationActions = Reflux.createActions([
  'annotationSave',
  'annotationDelete'
]);

module.exports = AnnotationActions;
