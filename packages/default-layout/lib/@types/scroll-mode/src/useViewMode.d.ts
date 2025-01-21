import { ViewMode, type Store } from '../../core';
import { type StoreProps } from './types/StoreProps';
export declare const useViewMode: (store: Store<StoreProps>) => {
    viewMode: ViewMode;
};
