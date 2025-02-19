import { ScrollMode, type Store } from '../../core';
import * as React from 'react';
import { type RenderSwitchScrollModeProps } from './types/RenderSwitchScrollModeProps';
import { type StoreProps } from './types/StoreProps';
type RenderSwitchScrollMode = (props: RenderSwitchScrollModeProps) => React.ReactElement;
export interface SwitchScrollModeProps {
    children?: RenderSwitchScrollMode;
    mode: ScrollMode;
}
export declare const SwitchScrollMode: React.FC<{
    children?: RenderSwitchScrollMode;
    mode: ScrollMode;
    store: Store<StoreProps>;
}>;
export {};
