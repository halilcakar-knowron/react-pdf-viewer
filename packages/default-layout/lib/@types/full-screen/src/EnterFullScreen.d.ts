import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface RenderEnterFullScreenProps {
    onClick(): void;
}
type RenderEnterFullScreen = (props: RenderEnterFullScreenProps) => React.ReactElement;
export interface EnterFullScreenProps {
    children?: RenderEnterFullScreen;
}
export declare const EnterFullScreen: React.FC<{
    children?: RenderEnterFullScreen;
    enableShortcuts: boolean;
    getFullScreenTarget(pagesContainer: HTMLElement): HTMLElement;
    store: Store<StoreProps>;
}>;
export {};
