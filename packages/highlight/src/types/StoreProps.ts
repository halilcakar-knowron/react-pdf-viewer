/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { type Destination } from '../../../core';
import { Trigger } from '../structs/Trigger';
import { type HighlightState } from './HighlightState';

export interface StoreProps {
    jumpToDestination?(destination: Destination): void;
    getPagesContainer?(): HTMLElement;
    highlightState: HighlightState;
    rotation?: number;
    trigger: Trigger;
}
