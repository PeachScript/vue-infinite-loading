// Type definitions for vue-infinite-loading v2.3.0
// Project: https://github.com/PeachScript/vue-infinite-loading
// Definitions by: Phil Scott <https://github.com/enkafan>
//                 PeachScript <https://github.com/PeachScript>

import Vue, { VNode, Component, PluginFunction } from 'vue';

export type SpinnerType = 'default' | 'bubbles' | 'circles' | 'spiral' | 'waveDots';
export type DirectionType = 'top' | 'bottom';

export interface Slots {
  spinner: VNode[];
  'no-result': VNode[];
  'no-more': VNode[];
  'error': VNode[];
  [key: string]: VNode[];
}

export interface StateChanger {
  loaded(): void;
  complete(): void;
  reset(): void;
  error(): void;
}

export interface InfiniteOptions {
  props?: {
    spinner?: SpinnerType;
    distance?: number;
    forceUseInfiniteWrapper?: boolean | string;
  };

  system?: {
    throttleLimit?: number;
  };

  slots?: {
    noResults?: string | Component;
    noMore?: string | Component;
    error?: string | Component;
    errorBtnText?: string;
    spinner?: string | Component;
  };
}

export default class InfiniteLoading extends Vue {
  // The trigger distance
  distance: number;

  // The load spinner type
  spinner: SpinnerType;

  // The scroll direction
  direction: DirectionType;

  // Whether find the element which has `infinite-wrapper` attribute as the scroll wrapper
  forceUseInfiniteWrapper: boolean | string;

  // Infinite event handler
  onInfinite: ($state: StateChanger) => void;

  // The method collection used to change infinite state
  stateChanger: StateChanger;

  // Slots
  $slots: Slots;
  
  static install: PluginFunction<InfiniteOptions>;
}

