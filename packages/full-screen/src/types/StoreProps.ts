/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { FullScreenMode, SpecialZoomLevel } from '../../../core';

export interface StoreProps {
    enterFullScreenMode(target: HTMLElement): void;
    exitFullScreenMode(): void;
    fullScreenMode: FullScreenMode;
    getPagesContainer?(): HTMLElement;
    zoom(scale: number | SpecialZoomLevel): void;
}
