# carbondream

## Reactjs Annotation Engine

Carbondream is an annotation engine written purely in ReactJS. It was inspired by [Annotator](http://annotatorjs.org) and heavily borrows from the UX.

## Using it

To use Carbondream:

- Install the component through NPM
- Require it
- Pass it a list of annotations and the following props:

  <CarbonDream
      allowEdit={true}
      allowDelete={true}
      scale={scale.current}
      annotations={carbonDreamAnnotations}
      selectedId={props.selectedAnnotationId}
      onSave={handleAnnotationSave}
      onDelete={props.deleteAnnotation}
      onSelect={props.selectAnnotation}
      onDeselect={props.deselectAnnotation}
      viewOnlyMode={!props.canReviewOutputs}
      height={viewerClientHeight}
      pageNumber={props.pageNumber}
      scrollPosition={scrollPosition}
  />

## Contributing

First, setup your local environment:

    git clone git@github.com:ZeroarcSoftware/carbondream.git
    cd carbondream
    npm install

Link the project to your local target environment:

    sudo npm link

Next, build the project:

    npm run build

Or, alternatively, use babel watch to continously watch for changes:

    NODE_ENV=production npx babel src/ -d dist/ --extensions '.ts,.tsx' -w
