// carbondream - Copyright 2021 Zeroarc Software, LLC

import { Map } from 'immutable';

export interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
}

export type Annotation = ImmutableMap<AnnotationPoint>;

export type AnnotationPoint = {
  id?: number;
  content: string;
  author: string;
  timeStamp: Date;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'marker' | 'highlight';
  drawing: boolean;
};

export type Offset = {
  horizontal: number;
  vertical: number;
  shadow: number | null;
};

export type Mode = 'marker' | 'square' | 'circle' | 'highlight';
