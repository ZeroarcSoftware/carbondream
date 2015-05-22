/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Demo: Annotation Reflux Store
 */

'use strict';

//External
let Reflux = require('reflux');
let Immutable = require('immutable');

//Local
let AnnotationActions = require('./AnnotationActions');


let AnalysisStore = Reflux.createStore({
  listenables: [AnnotationActions],

  getInitialState() {
    let stateJSON = localStorage['annotationState'] || '{"annotations":[{"author":"Test User","timeStamp":"2015-05-22T14:46:24.550Z","y1":76,"content":"Like this one!","x1":372,"y2":100,"x2":386,"type":"marker","id":1},{"author":"Test User","timeStamp":"2015-05-22T14:46:46.501Z","y1":100,"content":"I\'m a rectangle!","x1":88,"y2":120,"x2":145,"type":"square","id":2,"drawing":false},{"author":"Test User","timeStamp":"2015-05-22T14:47:01.125Z","y1":85,"content":"I am a circle!","x1":174,"y2":124,"x2":232,"type":"circle","id":3,"drawing":false},{"author":"Test User","timeStamp":"2015-05-22T14:47:08.700Z","y1":133,"content":"Greeen!","x1":8,"y2":156,"x2":90,"type":"highlight","id":4,"drawing":false},{"author":"Test User","timeStamp":"2015-05-22T14:47:24.510Z","y1":365,"content":"Used to be a lot of pirates.","x1":134,"y2":389,"x2":148,"type":"marker","id":5},{"author":"Test User","timeStamp":"2015-05-22T14:47:32.996Z","y1":276,"content":"Now not so many.","x1":414,"y2":300,"x2":428,"type":"marker","id":6},{"author":"Test User","timeStamp":"2015-05-22T14:47:57.251Z","y1":442,"content":"This is the x-axis.","x1":179,"y2":462,"x2":373,"type":"square","id":7,"drawing":false}],"lastId":7}';
    let state = JSON.parse(stateJSON);

    let annotations = state.annotations || [];
    let annotationMaps = annotations.map((a) => {
      a.timeStamp = new Date(a.timeStamp);
      return Immutable.Map(a);
    }); // Project to immutable maps

    this.annotations = Immutable.List(annotationMaps); // Wrap maps in list

    this.lastId = state.lastId || 0;

    return this.annotations;
  },

  annotationSave(annotation) {
    console.log('annotationSave');
    let index = -1;

    // Check to see if this is a new annotation. If so, issue UID
    if (!annotation.get('id')) {
      annotation = annotation.set('id', this.lastId + 1);
    }
    // Otherwise look for it in the existing list
    else {
      index = this.annotations.findIndex((value) => {
        if (value.get('id') === annotation.get('id')) return true;
        return false;
      });
    }

    // Update or add annotation accordingly
    annotation = annotation.set('author', 'Test User');

    if (index >= 0) {
      this.annotations = this.annotations.set(index, annotation);
    }
    else {
      this.annotations = this.annotations.push(annotation);
    }

    // Only change the Id if its higher, in case we are editing
    this.lastId = Math.ceil(annotation.get('id'), this.lastId);

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.annotations.toJS(),
      lastId: this.lastId
    });

    this.trigger(this.annotations);

  },

  annotationDelete(id) {
    let index = this.annotations.findIndex((value) => {
      if (value.get('id') === id) return true;
      return false;
    });

    this.annotations = this.annotations.delete(index);

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.annotations.toJS(),
      lastId: this.lastId
    });


    this.trigger(this.annotations);
  },
});

module.exports = AnalysisStore;
