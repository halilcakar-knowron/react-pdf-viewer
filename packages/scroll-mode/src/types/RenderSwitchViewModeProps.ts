/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { ViewMode } from '../../../core';

export interface RenderSwitchViewModeProps {
    isDisabled: boolean;
    isSelected: boolean;
    mode: ViewMode;
    onClick(): void;
}
