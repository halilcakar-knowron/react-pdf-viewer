import { SpecialZoomLevel } from '../../core';
import * as React from 'react';
export declare const ZoomPopover: React.FC<{
    levels?: number[];
    scale: number;
    onZoom(newScale: number | SpecialZoomLevel): void;
}>;
