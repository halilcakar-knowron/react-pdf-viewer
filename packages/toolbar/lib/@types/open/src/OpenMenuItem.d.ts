import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const OpenMenuItem: React.FC<{
    store: Store<StoreProps>;
    onClick(e: React.ChangeEvent<HTMLInputElement>): void;
}>;
