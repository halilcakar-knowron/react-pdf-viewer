import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const useTriggerOpen: (store: Store<StoreProps>) => {
    inputRef: React.RefObject<HTMLInputElement>;
    openFile: () => void;
};
