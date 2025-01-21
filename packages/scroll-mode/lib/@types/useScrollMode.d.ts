import { ScrollMode, type Store } from '../../core';
import { type StoreProps } from './types/StoreProps';
export declare const useScrollMode: (store: Store<StoreProps>) => {
    scrollMode: ScrollMode;
};
