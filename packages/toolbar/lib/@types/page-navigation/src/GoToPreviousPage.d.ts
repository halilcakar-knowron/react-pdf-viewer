import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
import { type RenderGoToPage } from './types/index';
export declare const GoToPreviousPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}>;
