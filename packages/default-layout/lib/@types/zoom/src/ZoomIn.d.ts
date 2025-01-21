import { type Store } from '../../core';
import * as React from 'react';
import { type RenderZoomInProps } from './types/RenderZoomInProps';
import { type StoreProps } from './types/StoreProps';
type RenderZoomIn = (props: RenderZoomInProps) => React.ReactElement;
export interface ZoomInProps {
    children?: RenderZoomIn;
}
export declare const ZoomIn: React.FC<{
    children?: RenderZoomIn;
    enableShortcuts: boolean;
    store: Store<StoreProps>;
}>;
export {};
