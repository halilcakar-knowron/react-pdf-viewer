/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { ScrollMode, ViewMode } from '../../../core';

export interface StoreProps {
    scrollMode: ScrollMode;
    viewMode: ViewMode;
    switchScrollMode(scrollMode: ScrollMode): void;
    switchViewMode(viewMode: ViewMode): void;
}
