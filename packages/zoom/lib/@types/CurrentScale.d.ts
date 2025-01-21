import { type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export interface RenderCurrentScaleProps {
    scale: number;
}
type RenderCurrentScale = (props: RenderCurrentScaleProps) => React.ReactElement;
export interface CurrentScaleProps {
    children?: RenderCurrentScale;
}
export declare const CurrentScale: React.FC<{
    children?: RenderCurrentScale;
    store: Store<StoreProps>;
}>;
export {};
