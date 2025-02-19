import { type Store } from '../../core';
import { type StoreProps } from './types/StoreProps';
export declare const useEnterFullScreen: (getFullScreenTarget: (pagesContainer: HTMLElement) => HTMLElement, store: Store<StoreProps>) => {
    enterFullScreen: () => void;
    exitFullScreen: () => void;
    isFullScreen: boolean;
};
