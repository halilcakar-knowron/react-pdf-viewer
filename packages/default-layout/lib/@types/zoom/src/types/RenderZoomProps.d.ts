import { SpecialZoomLevel } from '../../../core';
export interface RenderZoomProps {
    scale: number;
    onZoom(newScale: number | SpecialZoomLevel): void;
}
