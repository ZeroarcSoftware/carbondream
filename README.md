# carbondream
## Reactjs Annotation Engine

Carbondream is a purely an annotation engine written purely in ReactJS. It was inspired by [Annotator](http://annotatorjs.org) and heavily borrows from the UX.

## Using it

To use Carbondream, install the component through NPM, require it, then pass it a list of annotations, a save handler, and a delete handler:

    <Container
      annotations={annotations}
      onSave={this.handleAnnotationSave}
      onDelete={this.handleAnnotationDelete}
    />

Check out test/demo.jsx for a simple implementation using [RefluxJS](https://github.com/spoike/refluxjs) with local storage.


## Contributing

First setup your local environment:

    git clone git@github.com:ZeroarcSoftware/carbondream.git
    cd carbondream
    npm install

Then to build the project (for use in a npm link scenario):

    npm run build

To run the demo (uses browserify):

    npm run demo-build

Or to watch for changes:

    npm run demo-watch





