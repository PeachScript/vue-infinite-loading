// Type definitions for vue-infinite-loading v2.3.0
// Project: https://github.com/PeachScript/vue-infinite-loading
// Definitions by: Phil Scott <https://github.com/enkafan>
//                 PeachScript <https://github.com/PeachScript>

import Vue, { VNode } from 'vue';

declare namespace InfiniteLoading {
  type SpinnerType = 'default' | 'bubbles' | 'circles' | 'spiral' | 'waveDots';

  type DirectionType = 'top' | 'bottom';

  interface Slots {
    spinner: VNode[];
    'no-result': VNode[];
    'no-more': VNode[];
    [key: string]: VNode[];
  }

  interface StateChanger {
    loaded(): void;
    complete(): void;
    reset(): void;
  }
}

declare class InfiniteLoading extends Vue {
  // The trigger distance
  distance: number;

  // The load spinner type
  spinner: InfiniteLoading.SpinnerType;

  // The scroll direction
  direction: InfiniteLoading.DirectionType;

  // Whether find the element which has `infinite-wrapper` attribute as the scroll wrapper
  forceUseInfiniteWrapper: boolean;

  // Infinite event handler
  onInfinite: ($state: InfiniteLoading.StateChanger) => void;

  // The method collection used to change infinite state
  stateChanger: InfiniteLoading.StateChanger;

  // Slots
  $slots: InfiniteLoading.Slots;
}

export = InfiniteLoading;
