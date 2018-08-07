// @flow
// carbondream - Copyright 2017 Zeroarc Software, LLC
// Flow types for carbondream

import { Map } from 'immutable';

export type Annotation = Map<string,any>;

export type Offset = {
  horizontal: number,
  vertical: number,
  shadow: number | null,
};

export type Mode = 'marker' | 'square' | 'circle' | 'highlight';
