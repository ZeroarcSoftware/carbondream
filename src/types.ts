// carbondream - Copyright 2021 Zeroarc Software, LLC

import { Map } from 'immutable';

export type Annotation = Map<string,any>;

export type Offset = {
  horizontal: number,
  vertical: number,
  shadow: number | null,
};

export type Mode = 'marker' | 'square' | 'circle' | 'highlight';
