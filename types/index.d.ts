// Type definitions for vue-infinite-loading v2.3.0
// Project: https://github.com/PeachScript/vue-infinite-loading
// Definitions by: Phil Scott <https://github.com/enkafan>
//                 PeachScript <https://github.com/PeachScript>
//                 Andrew Vasilchuk <https://github.com/andrewvasilchuk>

import Vue, { VNode, Component, PluginFunction } from 'vue';

export type SpinnerType = 'default' | 'bubbles' | 'circles' | 'spiral' | 'waveDots';
export type DirectionType = 'top' | 'bottom';

export interface StateChanger {
  loaded(): void;
  complete(): void;
  reset(): void;
  error(): void;
}

export interface PluginOptions {
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

declare class VueInfiniteLoading {
  static install: PluginFunction<PluginOptions>
}

