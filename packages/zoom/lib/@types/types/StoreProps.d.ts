import { SpecialZoomLevel } from '../../../core';
export interface StoreProps {
    scale?: number;
    zoom?(scale: number | SpecialZoomLevel): void;
}
