import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const ShortcutHandler: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>;
    numPages: number;
    store: Store<StoreProps>;
}>;
