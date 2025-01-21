import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const PinchZoom: React.FC<{
    pagesContainerRef: React.RefObject<HTMLDivElement>;
    store: Store<StoreProps>;
}>;
