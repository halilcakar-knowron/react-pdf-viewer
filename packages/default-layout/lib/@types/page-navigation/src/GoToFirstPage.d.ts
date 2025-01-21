import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
import { type RenderGoToPage } from './types/index';
export declare const GoToFirstPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}>;
