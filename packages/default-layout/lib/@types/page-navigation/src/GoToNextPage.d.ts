import { type Store } from '../../core';
import * as React from 'react';
import { StoreProps } from './types/StoreProps';
import { type RenderGoToPage } from './types/index';
export declare const GoToNextPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}>;
